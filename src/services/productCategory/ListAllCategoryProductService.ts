import prismaClient from "../../prisma";

class ListAllCategoryProductService {
    async execute() {
        const product = await prismaClient.productCategory.findMany();

        return product;

    }
}

export { ListAllCategoryProductService }