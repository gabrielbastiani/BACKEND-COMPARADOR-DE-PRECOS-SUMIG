import prismaClient from "../../prisma";

interface ProductRequest {
    storeProduct_id: string;
    store: string;
    title_product: string;
}

class CreateProductService {
    async execute({ storeProduct_id, store, title_product }: ProductRequest) {

        function removerAcentos(s: any) {
            return s.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }

        function removerAcentosTitle(s: any) {
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
                title_product: title_product,
                slug_title_product: removerAcentosTitle(title_product)
            }
        });

        return product;

    }
}

export { CreateProductService }