import { StatusCategory } from '@prisma/client';
import prismaClient from '../../prisma';

class AllCategoryLevelZeroService {
    async execute() {
        const categorys = await prismaClient.category.findMany({
            where: {
                status: StatusCategory.Disponivel,
                nivel: 0
            },
            orderBy: {
                order: 'desc'
            },
            include: {
                Product: true
            }
        });

        return categorys;
    }
}

export { AllCategoryLevelZeroService }