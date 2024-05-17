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
            }
        });

        return product;

    }
}

export { ListProductsCategoryService }