import { Request, Response } from 'express';
import { FindStoreProductService } from '../../../services/products/searchProducts/FindStoreProductService';

class FindStoreProductController {
    async handle(req: Request, res: Response) {
        const slug = req.query.slug as string;

        const storeProduct = new FindStoreProductService();

        const productStore = await storeProduct.execute({
            slug
        });

        return res.json(productStore);

    }

}

export { FindStoreProductController }