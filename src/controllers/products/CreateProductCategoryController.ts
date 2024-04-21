import { Request, Response } from "express";
import { CreateProductCategoryService } from "../../services/products/CreateProductCategoryService";

class CreateProductCategoryController {
    async handle(req: Request, res: Response) {
        const {
            product_id,
            name,
            order
        } = req.body;

        const productCategory = new CreateProductCategoryService();

        const category = await productCategory.execute({
            product_id,
            name,
            order
        });

        return res.json(category)

    }
}

export { CreateProductCategoryController }