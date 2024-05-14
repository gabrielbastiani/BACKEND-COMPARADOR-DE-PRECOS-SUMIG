import prismaClient from "../../prisma";

interface ProductRequest {
    product_id: string;
}

class ListCategoryProductService {
    async execute({ product_id }: ProductRequest) {
        const product = await prismaClient.productCategory.findMany({
            where: {
                product_id: product_id
            }, orderBy: {
                created_at: 'asc'
            }
        });

        return product;

    }
}

export { ListCategoryProductService }