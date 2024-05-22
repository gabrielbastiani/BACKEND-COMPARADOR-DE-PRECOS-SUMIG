import prismaClient from "../../prisma";

interface ProductRequest {
    product_id: string;
}

class FindUniqueProductService {
    async execute({ product_id }: ProductRequest) {
        const product = await prismaClient.product.findUnique({
            where: {
                id: product_id
            }
        });

        return product;

    }
}

export { FindUniqueProductService }