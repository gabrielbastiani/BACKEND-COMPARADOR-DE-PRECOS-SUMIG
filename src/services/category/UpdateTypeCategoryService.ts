import prismaClient from "../../prisma";

interface CategoryRequest {
    category_id: string;
    type_category: string;
}

class UpdateTypeCategoryService {
    async execute({ category_id, type_category }: CategoryRequest) {
        const category = await prismaClient.category.update({
            where: {
                id: category_id,
            },
            data: {
                type_category: type_category
            }
        });

        return category;

    }
}

export { UpdateTypeCategoryService }