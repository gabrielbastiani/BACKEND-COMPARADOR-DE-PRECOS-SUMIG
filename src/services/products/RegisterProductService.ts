import prismaClient from "../../prisma";

interface ProductRequest {
    slug: string;
}

class RegisterProductService {
    async execute({ slug }: ProductRequest) {
        const product = await prismaClient.product.findMany({
            where: {
                slug: slug
            }, orderBy: {
                created_at: 'asc'
            },
            include: {
                ProductCategory: true,
                storeProduct: true
            }
        });

        return product;

    }
}

export { RegisterProductService }