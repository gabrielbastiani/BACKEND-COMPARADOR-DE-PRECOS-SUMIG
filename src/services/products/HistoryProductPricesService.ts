import prismaClient from "../../prisma";

interface ProductRequest {
    slug_title_product: string;
}

class HistoryProductPricesService {
    async execute({ slug_title_product }: ProductRequest) {

        const allProduct = await prismaClient.storeProduct.findMany({
            where: {
                slug_title_product: slug_title_product,
            },
            orderBy: {
                created_at: "asc"
            }
        });

        return allProduct;

    }
}

export { HistoryProductPricesService }