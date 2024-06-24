import prismaClient from "../../prisma";

class ListAllProductService {
    async execute() {

        const product = await prismaClient.storeProduct.findMany({
            orderBy: {
                created_at: "asc"
            },
            include: {
                productCategory: true
            }
        });

        return product;

    }
}

export { ListAllProductService }