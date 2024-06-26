import { Request, Response } from 'express';
import { DeleteCategoryService } from '../../services/category/DeleteCategoryService';
import { FindUniqueCategoryService } from '../../services/category/FindUniqueCategoryService';
import { AllCategorysService } from '../../services/category/AllCategorysService';
import fs from 'fs';

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