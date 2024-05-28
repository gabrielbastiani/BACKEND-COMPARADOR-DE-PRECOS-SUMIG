import prismaClient from "../../prisma";

interface ProductRequest {
    slug_title_product: string;
    slug: string;
}

class FindUniqueProductService {
    async execute({ slug_title_product, slug }: ProductRequest) {

        const product = await prismaClient.storeProduct.findMany({
            where: {
                slug_title_product: slug_title_product,
                slug: slug
            },
            orderBy: {
                created_at: "asc"
            }
        });

        const allProduct = await prismaClient.storeProduct.findMany({
            where: {
                slug_title_product: slug_title_product,
            },
            orderBy: {
                created_at: "asc"
            }
        });

        const date_product = await prismaClient.storeProduct.findFirst({
            where: {
                slug_title_product: slug_title_product,
                slug: slug
            }
        });

        const data = {
            product,
            allProduct,
            date_product
        }

        return data;

    }
}

export { FindUniqueProductService }