import prismaClient from '../../prisma';

interface CategoryRequest {
    category_id: string;
}

class FindUniqueCategoryService {
    async execute({ category_id }: CategoryRequest) {
        const exactCategory = await prismaClient.category.findUnique({
            where: {
                id: category_id
            }
        });

        return exactCategory;
    }
}

export { FindUniqueCategoryService }