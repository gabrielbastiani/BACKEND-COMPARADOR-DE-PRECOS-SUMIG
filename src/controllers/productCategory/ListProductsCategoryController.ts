import { Request, Response } from 'express';
import { ListProductsCategoryService } from '../../services/productCategory/ListProductsCategoryService'; 

class ListProductsCategoryController {
    async handle(req: Request, res: Response) {
        const slug = req.query.slug as string;

        const categorys = new ListProductsCategoryService();

        const productCategorys = await categorys.execute({
            slug
        });

        return res.json(productCategorys);

    }

}

export { ListProductsCategoryController }