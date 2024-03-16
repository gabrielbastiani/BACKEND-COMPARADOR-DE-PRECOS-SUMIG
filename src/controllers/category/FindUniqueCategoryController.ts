import { Request, Response } from 'express';
import { FindUniqueCategoryService } from '../../services/category/FindUniqueCategoryService';

class FindUniqueCategoryController {
  async handle(req: Request, res: Response) {

    const category_id = req.query.category_id as string;

    const categoryDetail = new FindUniqueCategoryService();

    const category = await categoryDetail.execute({ category_id });

    return res.json(category);

  }
}

export { FindUniqueCategoryController }