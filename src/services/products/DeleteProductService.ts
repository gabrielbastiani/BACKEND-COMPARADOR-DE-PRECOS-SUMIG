import prismaClient from "../../prisma";

interface ProductRequest {
    product_id: string;
}

class DeleteProductService {
    async execute({ product_id }: ProductRequest) {

        await prismaClient.productCategory.deleteMany({
            where: {
                product_id: product_id,
            }
        });

        const product = await prismaClient.product.delete({
            where: {
                id: product_id,
            }
        });

        return product;

    }
}

export { DeleteProductService }