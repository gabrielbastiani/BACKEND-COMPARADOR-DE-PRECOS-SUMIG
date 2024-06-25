import prismaClient from "../../prisma";

interface ProductRequest {
    storeProduct_id: string;
}

class DeleteProductService {
    async execute({ storeProduct_id }: ProductRequest) {

        await prismaClient.productCategory.deleteMany({
            where: {
                storeProduct_id: storeProduct_id,
            }
        });

        const product = await prismaClient.storeProduct.delete({
            where: {
                id: storeProduct_id,
            }
        });

        return product;

    }
}

export { DeleteProductService }