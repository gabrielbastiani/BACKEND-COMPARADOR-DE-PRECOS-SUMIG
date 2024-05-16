import { Request, Response } from 'express';
import { DeleteCategoryService } from '../../services/category/DeleteCategoryService';
import { FindUniqueCategoryService } from '../../services/category/FindUniqueCategoryService';
import fs from 'fs';

class DeleteCategoryController {
  async handle(req: Request, res: Response) {

    const category_id = req.query.category_id as string;
    const slug = req.query.slug as string;

    const deleteCategory = new DeleteCategoryService();
    const findImage = new FindUniqueCategoryService();

    const imageDelete = await findImage.execute({
      category_id
    });

    if (imageDelete.image === null) {
      const category = await deleteCategory.execute({ category_id, slug });
      return res.json(category);
    }

    fs.unlinkSync(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + imageDelete.image);

    const category = await deleteCategory.execute({ category_id, slug });

    return res.json(category);

  }
}

export { DeleteCategoryController }