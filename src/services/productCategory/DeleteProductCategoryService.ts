import prismaClient from "../../prisma";

interface ProductRequest {
    productCategory_id: string;
}

class DeleteProductCategoryService {
    async execute({ productCategory_id }: ProductRequest) {
        const categoryProduct = await prismaClient.productCategory.delete({
            where: {
                id: productCategory_id,
            }
        });

        return categoryProduct;

    }
}

export { DeleteProductCategoryService }