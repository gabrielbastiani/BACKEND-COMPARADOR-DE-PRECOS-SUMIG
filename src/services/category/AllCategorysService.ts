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

        const categorys_amp = await prismaClient.category.findMany({
            where: {
                type_category: "amperes"
            },
            orderBy: {
                order: 'asc'
            }
        });

        const categorys_process = await prismaClient.category.findMany({
            where: {
                type_category: "process"
            },
            orderBy: {
                order: 'asc'
            }
        });

        const categorys_accessory = await prismaClient.category.findMany({
            where: {
                type_category: "accessory"
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
            all_categorys,
            categorys_process,
            categorys_accessory,
            categorys_amp
        }

        return data;
    }
}

export { AllCategorysService }