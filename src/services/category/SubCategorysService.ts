import prismaClient from '../../prisma';

interface CategoryRequest {
    parentId: string;
}

class SubCategorysService {
    async execute({ parentId }: CategoryRequest) {
        
        const all_subcategorys = await prismaClient.category.findMany({
            where: {
                parentId: parentId,
                nivel: 1
            },
            orderBy: {
                order: 'asc'
            }
        });

        const categorys = await prismaClient.category.findUnique({
            where: {
                id: parentId
            }
        });

        const data = {
            all_subcategorys,
            categorys
        }

        return data;
    }
}

export { SubCategorysService }