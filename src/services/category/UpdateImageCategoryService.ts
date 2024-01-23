import prismaClient from "../../prisma";

interface ImageRequest {
    category_id: string;
    image: string;
}

class UpdateImageCategoryService {
    async execute({ category_id, image }: ImageRequest) {
        const updateImageCategoies = await prismaClient.category.update({
            where: {
                id: category_id
            },
            data: {
                image: image,
            }
        });

        return updateImageCategoies;

    }
}

export { UpdateImageCategoryService }