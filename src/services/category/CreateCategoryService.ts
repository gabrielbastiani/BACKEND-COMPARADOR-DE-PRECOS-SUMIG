import prismaClient from "../../prisma";

interface CategoryRequest {
  name: string;
  nivel: number;
  parentId: string;
  order: number;
  type_category: string;
}

class CreateCategoryService {
  async execute({ name, nivel, parentId, order, type_category }: CategoryRequest) {

    function removerAcentos(s: any) {
      return s.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/ +/g, "-")
        .replace(/-{2,}/g, "-")
        .replace(/[/]/g, "-");
    }

    const category = await prismaClient.category.create({
      data: {
        name: name,
        slug: removerAcentos(name),
        nivel: Number(nivel),
        parentId: parentId,
        order: Number(order),
        type_category: type_category
      }
    });

    return category;

  }
}

export { CreateCategoryService }