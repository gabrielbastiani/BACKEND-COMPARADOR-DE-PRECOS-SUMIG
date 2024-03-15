import { StatusCategory } from '@prisma/client';
import prismaClient from '../../prisma';

class AllCategoryService {
    async execute() {
        const categorys = await prismaClient.category.findMany({
            where: {
                status: StatusCategory.Disponivel
            },
            orderBy: {
                created_at: 'desc'
            },
            include: {
                Product: true
            }
        });

        return categorys;
    }
}

export { AllCategoryService }