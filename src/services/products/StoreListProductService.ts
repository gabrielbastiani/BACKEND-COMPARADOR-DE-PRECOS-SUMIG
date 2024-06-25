import prismaClient from "../../prisma";

interface ProductRequest {
    slug: string;
}

class StoreListProductService {
    async execute({ slug }: ProductRequest) {
        const product = await prismaClient.storeProduct.findMany({
            where: {
                slug: slug
            }, orderBy: {
                created_at: 'asc'
            },
            include: {
                productCategory: true
            }
        });

        return product;

    }
}

export { StoreListProductService }