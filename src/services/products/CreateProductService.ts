import prismaClient from "../../prisma";

interface ProductRequest {
    storeProduct_id: string;
    category_id: string;
}

class CreateProductService {
    async execute({ storeProduct_id, category_id }: ProductRequest) {

        const product = await prismaClient.product.create({
            data: {
                storeProduct_id: storeProduct_id,
                category_id: category_id
            }
        });

        return product;

    }
}

export { CreateProductService }