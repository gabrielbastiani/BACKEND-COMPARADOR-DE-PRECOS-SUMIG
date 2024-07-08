import { Request, Response } from 'express';
import { DeleteCategoryService } from '../../services/category/DeleteCategoryService';

class DeleteCategoryController {
  async handle(req: Request, res: Response) {

    const category_id = req.query.category_id as string;
    const slug = req.query.slug as string;

    const deleteCategory = new DeleteCategoryService();
    
    const category = await deleteCategory.execute({ category_id, slug });

    return res.json(category);

  }
}

export { DeleteCategoryController }