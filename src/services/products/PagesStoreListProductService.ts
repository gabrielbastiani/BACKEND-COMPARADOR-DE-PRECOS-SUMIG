import prismaClient from "../../prisma";

class PagesStoreListProductService {
    async execute(slug: string, page: string, limit: string, filter?: string, sort?: string, order?: string, minPrice?: number, maxPrice?: number) {

        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;
        const take = limitNum;

        let where: any = { slug: slug };

        if (filter) {
            where.OR = [
                { title_product: { contains: filter, mode: 'insensitive' } },
                { brand: { contains: filter, mode: 'insensitive' } }
            ];
        }

        if (minPrice !== undefined) {
            where.price = { ...where.price, gte: minPrice };
        }
        if (maxPrice !== undefined) {
            where.price = { ...where.price, lte: maxPrice };
        }

        let orderBy: any = {};

        if (sort && sort === 'price') {
            orderBy.price = order === 'asc' ? 'asc' : 'desc';
        }

        if (sort) {
            orderBy[sort] = order;
        }

        const product = await prismaClient.storeProduct.findMany({
            where: where,
            skip: skip,
            take: take,
            orderBy: Object.keys(orderBy).length > 0 ? orderBy : undefined,
            include: {
                product: true
            }
        });

        const totalPosts = await prismaClient.storeProduct.count({ where: where });

        const data = {
            totalPages: Math.ceil(totalPosts / take),
            currentPage: parseInt(page),
            product: product,
        }

        return data;

    }
}

export { PagesStoreListProductService }