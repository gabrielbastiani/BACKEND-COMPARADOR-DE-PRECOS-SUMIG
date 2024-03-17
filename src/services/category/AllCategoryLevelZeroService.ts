import prismaClient from '../../prisma';

class AllCategoryLevelZeroService {
    async execute() {
        const categorys = await prismaClient.category.findMany({
            where: {
                nivel: 0
            },
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

export { AllCategoryLevelZeroService }