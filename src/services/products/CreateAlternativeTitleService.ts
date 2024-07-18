import prismaClient from "../../prisma";

interface AlternativeRequest {
    slug_title_product: string;
    title_alternative: string;
}

class CreateAlternativeTitleService {
    async execute({ slug_title_product, title_alternative }: AlternativeRequest) {

        function removerAcentos(s: any) {
            return s.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/ +/g, "-")
                .replace(/-{2,}/g, "-")
                .replace(/[/]/g, "-");
        }

        const alternative = await prismaClient.titleAlternative.create({
            data: {
                slug_title_product: slug_title_product,
                title_alternative: title_alternative,
                slug_title_alternative: removerAcentos(title_alternative)
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

        return alternative;

    }
}

export { CreateAlternativeTitleService }