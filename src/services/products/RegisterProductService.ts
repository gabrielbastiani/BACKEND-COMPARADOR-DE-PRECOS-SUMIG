import prismaClient from "../../prisma";

interface ProductRequest {
    store: string;
}

class RegisterProductService {
    async execute({ store }: ProductRequest) {
        const product = await prismaClient.product.findMany({
            where: {
                storeProduct: {
                    store: store
                }
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