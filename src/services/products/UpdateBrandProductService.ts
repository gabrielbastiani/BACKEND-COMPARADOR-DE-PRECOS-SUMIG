import prismaClient from "../../prisma";

interface ProductRequest {
    storeProduct_id: string;
    brand: string;
}

class UpdateBrandProductService {
    async execute({ storeProduct_id, brand }: ProductRequest) {

        const product = await prismaClient.storeProduct.update({
            where: {
                id: storeProduct_id,
            },
            data: {
                brand: brand
            }
        });

        return product;

    }
}

export { UpdateBrandProductService }