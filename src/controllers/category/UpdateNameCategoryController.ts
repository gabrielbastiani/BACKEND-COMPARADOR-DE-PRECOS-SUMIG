import { Request, Response } from 'express';
import { UpdateNameCategoryService } from '../../services/category/UpdateNameCategoryService';

class UpdateNameCategoryController {
    async handle(req: Request, res: Response) {
        const category_id = req.query.category_id as string;

        const { name } = req.body;

        const updateName = new UpdateNameCategoryService();

        const categoryUpdate = await updateName.execute({
            category_id,
            name
        });

        return res.json(categoryUpdate);

    }

}

export { UpdateNameCategoryController }