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
            },
            include: {
                Product: true
            }
        });

        const categorys = await prismaClient.category.findUnique({
            where: {
                id: parentId,
                nivel: 0
            },
            include: {
                Product: true
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