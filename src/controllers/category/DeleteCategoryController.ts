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
    const findImage = new FindUniqueCategoryService();
    const listAll = new AllCategorysService();
    const categorys = await listAll.execute();

    const imageDelete = await findImage.execute({
      category_id
    });

    if (imageDelete.image === null) {
      const category = await deleteCategory.execute({ category_id, slug });
      return res.json(category);
    }

    const existCateg = categorys.all_categorys.filter(item => item.parentId === category_id);

    if (imageDelete.nivel === 0 && existCateg.length === 0) {
      fs.unlinkSync(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + imageDelete.image);
      const category = await deleteCategory.execute({ category_id, slug });
      return res.json(category);
    }

    if (existCateg) {
      throw new Error("Delete a(s) categoria(s) vincula(s) a essa categoria antes de poder deletar esta categoria");
    }

    fs.unlinkSync(__dirname + '/' + '..' + '/' + '..' + '/' + '..' + '/' + 'images' + '/' + imageDelete.image);

    const category = await deleteCategory.execute({ category_id, slug });

    return res.json(category);

  }
}

export { DeleteCategoryController }