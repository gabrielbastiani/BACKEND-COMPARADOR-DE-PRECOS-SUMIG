import prismaClient from "../../prisma";

interface ProductCategoryRequest {
    product_id: string;
    name: string;
    order: number;
}

class CreateProductCategoryService {
    async execute({ product_id, name, order }: ProductCategoryRequest) {

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
                product_id: product_id,
                name: name,
            }
        });

        if (categoryAlredyExist) {
            throw new Error("Categoria já cadastrada nesse produto!");
        }

        const categories = await prismaClient.productCategory.create({
            data: {
                product_id: product_id,
                name: name,
                slug: removerAcentos(name),
                order: Number(order)
            }
        });

        return categories;

    }
}

export { CreateProductCategoryService }