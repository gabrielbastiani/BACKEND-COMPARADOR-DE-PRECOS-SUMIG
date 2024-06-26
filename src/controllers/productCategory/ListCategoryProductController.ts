import { Request, Response } from 'express';
import { ListCategoryProductService } from '../../services/productCategory/ListCategoryProductService'; 

class ListCategoryProductController {
    async handle(req: Request, res: Response) {
        const storeProduct_id = req.query.storeProduct_id as string;

        const categorys = new ListCategoryProductService();

        const productCategorys = await categorys.execute({
            storeProduct_id
        });

        return res.json(productCategorys);

    }

}

export { ListCategoryProductController }