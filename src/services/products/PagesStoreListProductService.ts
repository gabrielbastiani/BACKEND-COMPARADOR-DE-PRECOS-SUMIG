import prismaClient from "../../prisma";

class PagesStoreListProductService {
    async execute(page: number, pageSize: number, filter: string, slug: string) {

        /* const storeProduct = await prismaClient.storeProduct.findMany({
            where: {
                slug: slug
            },
            include: {
                product: true
            }
        }); */

        const whereClause: any = {};

        if (filter?.priceRange) {
            whereClause.price = {
            gte: filter.priceRange[0],
            lte: filter.priceRange[1],
            };
        }

        if (filter?.nameContains) {
            whereClause.name = {
            contains: filter.nameContains,
            };
        }

        const product = await prismaClient.storeProduct.findMany({
            whereClause,
            skip: (page - 1) * pageSize,
            take: pageSize,
            include: {
                product: true
            }
        });

        const totalPosts = await prismaClient.storeProduct.count();

        const data = {
            /* storeProduct, */
            product,
            totalPosts,
            totalPages: Math.ceil(totalPosts / pageSize),
            currentPage: page,
        }

        return data;

    }
}

export { PagesStoreListProductService }