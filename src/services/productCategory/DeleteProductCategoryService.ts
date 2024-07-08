import prismaClient from "../../prisma";

interface ProductRequest {
    productCategory_id: string;
}

class DeleteProductCategoryService {
    async execute({ productCategory_id }: ProductRequest) {

        const childCategories = await prismaClient.productCategory.findMany({
            where: {
                parentId: productCategory_id
            },
        });

        if (childCategories.length > 0) {
            throw new Error("Não é possível deletar esse produto, pois esta cadastrado em categoria(s) superiores a está.");
        }

        const categoryProduct = await prismaClient.productCategory.delete({
            where: {
                id: productCategory_id,
            }
        });

        return categoryProduct;

    }
}

export { DeleteProductCategoryService }