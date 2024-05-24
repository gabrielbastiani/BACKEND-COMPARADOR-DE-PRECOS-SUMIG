import prismaClient from "../../prisma";

interface ProductRequest {
    slug_title_product: string;
}

class FindUniqueProductService {
    async execute({ slug_title_product }: ProductRequest) {

        const product = await prismaClient.storeProduct.findMany({
            where: {
                slug_title_product: slug_title_product
            },
            orderBy: {
                created_at: "asc"
            }
        });

        const date_product = await prismaClient.storeProduct.findFirst({
            where: {
                slug_title_product: slug_title_product
            }
        });

        const data = {
            product,
            date_product
        }

        return data;

    }
}

export { FindUniqueProductService }