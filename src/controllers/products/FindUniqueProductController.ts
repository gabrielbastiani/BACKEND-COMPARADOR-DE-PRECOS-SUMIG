import { Request, Response } from 'express';
import { FindUniqueProductService } from '../../services/products/FindUniqueProductService';

class FindUniqueProductController {
    async handle(req: Request, res: Response) {
        const product_id = req.query.product_id as string;

        const storeProduct = new FindUniqueProductService();

        const productStore = await storeProduct.execute({
            product_id
        });

        return res.json(productStore);

    }

}

export { FindUniqueProductController }