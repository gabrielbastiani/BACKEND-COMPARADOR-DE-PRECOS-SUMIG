import prismaClient from "../../prisma";

interface ProductRequest {
    productCategory_id: string;
    order: number;
}

class UpdateOrderProductService {
    async execute({ productCategory_id, order }: ProductRequest) {
        const product = await prismaClient.productCategory.update({
            where: {
                id: productCategory_id,
            },
            data: {
                order: Number(order)
            }
        });

        return product;

    }
}

export { UpdateOrderProductService }