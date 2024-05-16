import prismaClient from '../../prisma';

interface CategoryRequest {
    category_id: string;
    slug: string;
}

class DeleteCategoryService {
    async execute({ category_id, slug }: CategoryRequest) {

        const existSubCategorys = await prismaClient.category.findMany({
            where: {
                parentId: category_id
            }
        });

        const productCategory = await prismaClient.productCategory.findFirst({
            where: {
                slug: slug
            }
        });

        if (existSubCategorys.length >= 1) {
            throw new Error("Delete a(s) categoria(s) vincula(s) a essa categoria antes de poder deletar esta categoria");
        }

        if (productCategory) {
            await prismaClient.productCategory.deleteMany({
                where: {
                    slug: slug
                }
            });
        }

        const exactCategory = await prismaClient.category.delete({
            where: {
                id: category_id
            }
        });

        console.log(exactCategory)

        return exactCategory;
    }
}

export { DeleteCategoryService }