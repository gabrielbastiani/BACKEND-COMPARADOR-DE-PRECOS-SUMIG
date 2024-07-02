import { Request, Response } from "express";
import { CreateProductCategoryService } from "../../services/productCategory/CreateProductCategoryService";

class CreateProductCategoryController {
    async handle(req: Request, res: Response) {
        const {
            storeProduct_id,
            name,
            category_id,
            order,
            slug_title_product,
            store
        } = req.body;

        const productCategory = new CreateProductCategoryService();

        const category = await productCategory.execute({
            storeProduct_id,
            name,
            category_id,
            order,
            slug_title_product,
            store
        });

        return res.json(category)

    }
}

export { CreateProductCategoryController }