import prismaClient from "../../../prisma";

interface StoreRequest {
    store: string;
}

class FindStoreProductService {
    async execute({ store }: StoreRequest) {
        const product = await prismaClient.storeProduct.findFirst({
            where: {
                store: store
            }
        });

        return product;

    }
}

export { FindStoreProductService }