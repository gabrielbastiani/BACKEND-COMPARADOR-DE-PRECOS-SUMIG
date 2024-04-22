import { Request, Response } from 'express';
import { UpdateTypeCategoryService } from '../../services/category/UpdateTypeCategoryService';

class UpdateTypeCategoryController {
    async handle(req: Request, res: Response) {
        const category_id = req.query.category_id as string;

        const { type_category } = req.body;

        const updateType = new UpdateTypeCategoryService();

        const categoryUpdate = await updateType.execute({
            category_id,
            type_category
        });

        return res.json(categoryUpdate);

    }

}

export { UpdateTypeCategoryController }