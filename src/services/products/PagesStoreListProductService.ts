import prismaClient from "../../prisma";

class PagesStoreListProductService {
    async execute(page: number, pageSize: number, filter: string, slug: string) {

        let where: any = {};

        if (filter) {
            where = {
                slug: slug,
                OR: [
                    { title_product: { contains: filter, mode: 'insensitive' } },
                    { brand: { contains: filter, mode: 'insensitive' } }
                ]
            };
        }

        console.log(where)

        const product = await prismaClient.storeProduct.findMany({
            where,
            skip: (page - 1) * pageSize,
            take: pageSize,
            include: {
                product: true
            }
        });

        const totalPosts = await prismaClient.storeProduct.count();

        const data = {
            product,
            totalPosts,
            totalPages: Math.ceil(totalPosts / pageSize),
            currentPage: page,
        }

        return data;

    }
}

export { PagesStoreListProductService }