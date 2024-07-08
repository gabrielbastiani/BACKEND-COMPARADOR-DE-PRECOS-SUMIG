import prismaClient from "../../prisma";

interface ProductCategoryRequest {
    storeProduct_id: string;
    slug_title_product: string;
    store: string;
}

class CaptureWeldingMachinService {
    async execute({ storeProduct_id, slug_title_product, store }: ProductCategoryRequest) {

        function removerAcentos(s: any) {
            return s.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }

        const categoryMachineWelding = await prismaClient.category.findFirst({
            where: {
                name: "Máquinas de solda"
            }
        });

        const categories = await prismaClient.productCategory.create({
            data: {
                storeProduct_id: storeProduct_id,
                category_id: categoryMachineWelding.id,
                name: categoryMachineWelding.name,
                slug: removerAcentos(categoryMachineWelding.name),
                order: 0,
                store: store,
                slug_title_product: slug_title_product
            }
        });

        return categories;

    }
}

export { CaptureWeldingMachinService }