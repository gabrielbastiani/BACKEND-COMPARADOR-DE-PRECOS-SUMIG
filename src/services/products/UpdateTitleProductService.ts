import prismaClient from "../../prisma";

interface ProductRequest {
    storeProduct_id: string;
    title_product: string;
}

class UpdateTitleProductService {
    async execute({ storeProduct_id, title_product }: ProductRequest) {

        function removerAcentos(s: any) {
            return s.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }

        const product = await prismaClient.storeProduct.update({
            where: {
                id: storeProduct_id
            },
            data: {
                title_product: title_product,
                slug_title_product: removerAcentos(title_product)
            }
        });

        return product;

    }
}

export { UpdateTitleProductService }