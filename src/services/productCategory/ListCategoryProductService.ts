import prismaClient from "../../prisma";

interface ProductRequest {
    storeProduct_id: string;
}

class ListCategoryProductService {
    async execute({ storeProduct_id }: ProductRequest) {
        const product = await prismaClient.productCategory.findMany({
            where: {
                storeProduct_id: storeProduct_id
            }, orderBy: {
                created_at: 'asc'
            }
        });

        return product;

    }
}

export { ListCategoryProductService }