import { Request, Response } from 'express';
import { StoreListProductService } from '../../services/products/StoreListProductService';

class StoreListProductController {
    async handle(req: Request, res: Response) {
        const slug = req.query.slug as string;

        const storeProduct = new StoreListProductService();

        const productStore = await storeProduct.execute({
            slug
        });

        return res.json(productStore);

    }

}

export { StoreListProductController }