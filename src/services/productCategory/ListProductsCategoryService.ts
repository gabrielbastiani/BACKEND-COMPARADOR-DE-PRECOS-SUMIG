import prismaClient from "../../prisma";

class ListProductsCategoryService {
    async execute(slug: string, page: string, limit: string, filter?: string, sort?: string, order?: string, minPrice?: number, maxPrice?: number) {

        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;
        const take = limitNum;

        // Inicializar a cláusula where para a tabela storeProduct
        let storeProductWhere: any = {};

        if (filter) {
            storeProductWhere.OR = [
                { title_product: { contains: filter, mode: 'insensitive' } },
                { brand: { contains: filter, mode: 'insensitive' } }
            ];
        }

        if (minPrice !== undefined) {
            storeProductWhere.price = { ...storeProductWhere.price, gte: minPrice };
        }
        if (maxPrice !== undefined) {
            storeProductWhere.price = { ...storeProductWhere.price, lte: maxPrice };
        }

        let orderBy: any = {};

        if (sort === 'price') {
            orderBy = {
                product: {
                    storeProduct: {
                        price: order === 'asc' ? 'asc' : 'desc'
                    }
                }
            };
        } else if (sort) {
            orderBy = {
                product: {
                    storeProduct: {
                        [sort]: order
                    }
                }
            };
        }

        const productCategories = await prismaClient.productCategory.findMany({
            where: {
                slug: slug
            },
            skip: skip,
            take: take,
            orderBy: Object.keys(orderBy).length > 0 ? orderBy : undefined,
            include: {
                product: {
                    include: {
                        storeProduct: {
                            where: storeProductWhere
                        }
                    }
                }
            }
        });

        console.log(productCategories)

        const totalPosts = await prismaClient.productCategory.count({
            where: {
                slug: slug,
                product: {
                    storeProduct: {
                        ...storeProductWhere
                    }
                }
            }
        });

        const productDate = await prismaClient.category.findFirst({
            where: {
                slug: slug
            }
        });

        const data = {
            totalPages: Math.ceil(totalPosts / take),
            currentPage: pageNum,
            product: productCategories,
            productDate: productDate
        };

        return data;
    }
}

export { ListProductsCategoryService };