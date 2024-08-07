import prismaClient from "../../prisma";

interface ProductCategoryRequest {
    storeProduct_id: string;
    slug_title_product: string;
    store: string;
}

class CaptureCutMachinService {
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
                name: "Máquinas de corte plasma manual"
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

        const registerCapture = await prismaClient.storeProduct.findFirst({
            where: {
                id: storeProduct_id,
                register: "Sim"
            }
        });

        if (registerCapture) {
            throw new Error("Produto ja cadastrado!");
        }

        await prismaClient.storeProduct.update({
            where: {
                id: storeProduct_id
            },
            data: {
                register: "Sim"
            }
        });

        return categories;

    }
}

export { CaptureCutMachinService }