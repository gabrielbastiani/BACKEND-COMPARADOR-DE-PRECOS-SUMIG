import { Request, Response } from 'express';
import { ListCategoryProductService } from '../../services/productCategory/ListCategoryProductService'; 

class ListCategoryProductController {
    async handle(req: Request, res: Response) {
        const product_id = req.query.product_id as string;

        const categorys = new ListCategoryProductService();

        const productCategorys = await categorys.execute({
            product_id
        });

        return res.json(productCategorys);

    }

}

export { ListCategoryProductController }