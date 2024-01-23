import prismaClient from "../../prisma";

interface CategoryRequest {
  name: string;
  nivel: number;
  parentId: string;
  order: number;
  image: string;
}

class CreateCategoryService {
  async execute({ name, nivel, parentId, order, image }: CategoryRequest) {

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
        nivel: nivel,
        parentId: parentId,
        order: order,
        image: image
      }
    });

    return category;

  }
}

export { CreateCategoryService }