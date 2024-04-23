import prismaClient from "../../prisma";

interface ProductRequest {
    storeProduct_id: string;
    name: string;
}

class CreateProductService {
    async execute({ storeProduct_id, name }: ProductRequest) {

        const findProductExist = await prismaClient.product.findFirst({
            where: {
                storeProduct_id: storeProduct_id,
                ProductCategory: {
                    some: { name: name }
                }
            }
        });

        if (findProductExist) {
            throw new Error("Essa categoria já esta cadastrada para esse produto");
        }

        const findProduct = await prismaClient.product.findFirst({
            orderBy: {
                created_at: 'asc'
            }
        });

        await prismaClient.productCategory.create({
            data: {
                product_id: findProduct.id,
                name: name
            }
        });

        const product = await prismaClient.product.create({
            data: {
                storeProduct_id: storeProduct_id
            }
        });

        return product;

    }
}

export { CreateProductService }