import prismaClient from '../../prisma';

class AllCategorysService {
    async execute() {
        const categorys_zero = await prismaClient.category.findMany({
            where: {
                nivel: 0
            },
            orderBy: {
                order: 'asc'
            }
        });

        const all_categorys = await prismaClient.category.findMany({
            orderBy: {
                order: 'asc'
            }
        });

        const data = {
            categorys_zero,
            all_categorys
        }

        return data;
    }
}

export { AllCategorysService }