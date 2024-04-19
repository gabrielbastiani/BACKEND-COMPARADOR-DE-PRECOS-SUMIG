import prismaClient from "../../prisma";

interface ProductRequest {
    store: string;
}

class StoreListProductService {
    async execute({ store }: ProductRequest) {

        const product = await prismaClient.storeProduct.findMany({
            where: {
                store: store
            }, orderBy: {
                created_at: 'asc'
            },
            include: {
                Product: true
            }
        });

        return product;

    }
}

export { StoreListProductService }