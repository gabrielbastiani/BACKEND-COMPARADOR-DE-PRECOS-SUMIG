import { Request, Response } from 'express';
import { DeleteProductCategoryService } from '../../services/productCategory/DeleteProductCategoryService'; 

class DeleteProductCategoryController {
    async handle(req: Request, res: Response) {
        const productCategory_id = req.query.productCategory_id as string;

        const deleteCategory = new DeleteProductCategoryService();

        const productDelete = await deleteCategory.execute({
            productCategory_id
        });

        return res.json(productDelete);

    }

}

export { DeleteProductCategoryController }