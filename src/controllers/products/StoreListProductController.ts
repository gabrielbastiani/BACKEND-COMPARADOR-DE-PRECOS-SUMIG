import { Request, Response } from 'express';
import { StoreListProductService } from '../../services/products/StoreListProductService';

class StoreListProductController {
    async handle(req: Request, res: Response) {
        const store = req.query.store as string;

        const storeProduct = new StoreListProductService();

        const productStore = await storeProduct.execute({
            store
        });

        return res.json(productStore);

    }

}

export { StoreListProductController }