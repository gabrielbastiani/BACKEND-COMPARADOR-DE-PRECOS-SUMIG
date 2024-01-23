import { Request, Response } from 'express';
import { UpdateImageCategoryService } from '../../services/category/UpdateImageCategoryService';
import { FindUniqueCategoryService } from '../../services/category/FindUniqueCategoryService';
import fs from 'fs';

class UpdateImageCategoryController {
    async handle(req: Request, res: Response) {
        const { category_id } = req.body;

        const updateImage = new UpdateImageCategoryService();
        const findImage = new FindUniqueCategoryService();

        const imagesUpdateCateg = await findImage.execute({
            category_id
        });

        fs.unlinkSync(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + imagesUpdateCateg.image);

        if (!req.file) {
            throw new Error('error upload file');
        } else {
            const { originalname, filename: image } = req.file;

            const imageUpdate = await updateImage.execute({
                category_id,
                image,
            });

            return res.json([imagesUpdateCateg, imageUpdate]);

        }

    }
}

export { UpdateImageCategoryController }