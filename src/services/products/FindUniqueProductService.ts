import prismaClient from "../../prisma";

interface ProductRequest {
    slug_title_product: string;
}

class FindUniqueProductService {
    async execute({ slug_title_product }: ProductRequest) {
        const product = await prismaClient.storeProduct.findMany({
            where: {
                slug_title_product: slug_title_product
            }
        });

        return product;

    }
}

export { FindUniqueProductService }