import prismaClient from '../../prisma';

class AllCategorysService {
    async execute() {
        const categorys = await prismaClient.category.findMany({
            orderBy: {
                order: 'asc'
            },
            include: {
                Product: true
            }
        });

        return categorys;
    }
}

export { AllCategorysService }