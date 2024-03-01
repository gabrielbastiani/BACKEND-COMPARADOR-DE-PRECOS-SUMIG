import prismaClient from "../../prisma";

interface ProductRequest {
    store: string;
}

class StoreListProductService {
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
                storeProduct: true
            }
        });

        return product;

    }
}

export { StoreListProductService }