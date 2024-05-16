import prismaClient from '../../prisma';

interface CategoryRequest {
    category_id: string;
    name: string;
}

class DeleteCategoryService {
    async execute({ category_id, name }: CategoryRequest) {

        const existSubCategorys = await prismaClient.category.findMany({
            where: {
                parentId: category_id
            }
        });

        const productCategory = await prismaClient.productCategory.findFirst({
            where: {
                name: name
            }
        });

        if (existSubCategorys.length >= 1) {
            throw new Error("Delete a(s) categoria(s) vincula(s) a essa categoria antes de poder deletar esta categoria");
        }

        if (productCategory) {
            await prismaClient.productCategory.deleteMany({
                where: {
                    name: name
                }
            });
        }

        const exactCategory = await prismaClient.category.delete({
            where: {
                id: category_id
            }
        });

        return exactCategory;
    }
}

export { DeleteCategoryService }