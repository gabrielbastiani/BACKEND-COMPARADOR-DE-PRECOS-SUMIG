import prismaClient from "../../prisma";

interface ProductRequest {
    slug: string;
}

class ListProductsCategoryService {
    async execute({ slug }: ProductRequest) {
        const product = await prismaClient.productCategory.findMany({
            where: {
                slug: slug
            }, orderBy: {
                created_at: 'asc'
            },
            include: {
                product: {
                    include: {
                        storeProduct: true
                    }
                }
            }
        });

        const productDate = await prismaClient.category.findFirst({
            where: {
                slug: slug
            }
        });

        const data = {
            product,
            productDate
        }

        return data;

    }
}

export { ListProductsCategoryService }