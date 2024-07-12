import prismaClient from "../../prisma";

interface ProductRequest {
    storeProduct_id: string;
}

class UpdateRegisterProductService {
    async execute({ storeProduct_id }: ProductRequest) {

        const product = await prismaClient.storeProduct.update({
            where: {
                id: storeProduct_id
            },
            data: {
                register: "Nao"
            }
        });

        return product;

    }
}

export { UpdateRegisterProductService }