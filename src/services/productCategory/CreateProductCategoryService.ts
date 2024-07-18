import prismaClient from "../../prisma";

interface ProductCategoryRequest {
    storeProduct_id: string;
    parentId: string;
    name: string;
    order: number;
    slug_title_product: string;
    store: string;
    category_id: string;
}

class CreateProductCategoryService {
    async execute({ storeProduct_id, name, order, slug_title_product, store, category_id, parentId }: ProductCategoryRequest) {

        function removerAcentos(s: any) {
            return s.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }

        const categoryAlredyExist = await prismaClient.productCategory.findFirst({
            where: {
                storeProduct_id: storeProduct_id,
                name: name,
            }
        });

        if (categoryAlredyExist) {
            throw new Error("Categoria já cadastrada nesse produto!");
        }

        const categories = await prismaClient.productCategory.create({
            data: {
                storeProduct_id: storeProduct_id,
                category_id: category_id,
                parentId: parentId,
                name: name,
                slug: removerAcentos(name),
                order: Number(order),
                store: store,
                slug_title_product: slug_title_product
            }
        });

        const existingProducts = await prismaClient.storeProduct.findMany();

        for (const product of existingProducts) {
            try {
                const titleAlternative = await prismaClient.titleAlternative.findFirst({
                    where: {
                        slug_title_product: product.slug_title_product
                    }
                });

                if (titleAlternative) {
                    await prismaClient.storeProduct.updateMany({
                        where: {
                            id: product.id
                        },
                        data: {
                            title_product: titleAlternative.title_alternative,
                            slug_title_product: titleAlternative.slug_title_alternative
                        }
                    });

                    console.log(`Produto atualizado: ${product.title_product}`);
                }
            } catch (updateError) {
                console.error(`Erro ao atualizar produto: ${product.title_product}`, updateError);
            }
        }

        return categories;

    }
}

export { CreateProductCategoryService }