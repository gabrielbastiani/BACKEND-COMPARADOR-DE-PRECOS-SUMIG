import prismaClient from "../../prisma";

class ListAllProductService {
    async execute() {

        const product = await prismaClient.product.findMany({
            orderBy: {
                created_at: "asc"
            },
            include: {
                storeProduct: true
            }
        });

        return product;

    }
}

export { ListAllProductService }