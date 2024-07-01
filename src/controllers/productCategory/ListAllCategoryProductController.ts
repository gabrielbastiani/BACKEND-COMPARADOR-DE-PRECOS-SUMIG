import { Request, Response } from 'express';
import { ListAllCategoryProductService } from '../../services/productCategory/ListAllCategoryProductService'; 

class ListAllCategoryProductController {
    async handle(req: Request, res: Response) {

        const categorys = new ListAllCategoryProductService();

        const productCategorys = await categorys.execute();

        return res.json(productCategorys);

    }

}

export { ListAllCategoryProductController }