import prismaClient from "../../prisma";

interface ProductRequest {
    storeProduct_id: string;
    store: string;
}

class CreateProductService {
    async execute({ storeProduct_id, store }: ProductRequest) {

        function removerAcentos(s: any) {
            return s.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }

        const product = await prismaClient.product.create({
            data: {
                storeProduct_id: storeProduct_id,
                store: store,
                slug: removerAcentos(store),
            }
        });

        return product;

    }
}

export { CreateProductService }