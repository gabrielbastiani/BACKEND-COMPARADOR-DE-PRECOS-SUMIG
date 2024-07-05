import { Request, Response } from 'express';
import { UpdateTitleProductService } from '../../services/products/UpdateTitleProductService';

class UpdateTitleProductController {
    async handle(req: Request, res: Response) {
        const storeProduct_id = req.query.storeProduct_id as string;

        const { title_product } = req.body;

        const createProduct = new UpdateTitleProductService();

        const product = await createProduct.execute({
            storeProduct_id,
            title_product
        });

        return res.json(product);

    }

}

export { UpdateTitleProductController }