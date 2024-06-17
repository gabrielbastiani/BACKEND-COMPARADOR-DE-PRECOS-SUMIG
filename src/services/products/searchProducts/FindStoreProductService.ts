import prismaClient from "../../../prisma";

interface StoreRequest {
    slug: string;
}

class FindStoreProductService {
    async execute({ slug }: StoreRequest) {
        const product = await prismaClient.storeProduct.findFirst({
            where: {
                slug: slug
            }
        });

        return product;

    }
}

export { FindStoreProductService }