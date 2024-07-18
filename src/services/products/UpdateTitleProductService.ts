import prismaClient from "../../prisma";

class UpdateTitleProductService {
    async execute() {

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

    }
}

export { UpdateTitleProductService }