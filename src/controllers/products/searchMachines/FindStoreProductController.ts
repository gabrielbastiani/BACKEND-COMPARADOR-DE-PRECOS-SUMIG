import { Request, Response } from 'express';
import { FindStoreProductService } from '../../../services/products/searchMachines/FindStoreProductService';

class FindStoreProductController {
    async handle(req: Request, res: Response) {
        const store = req.query.store as string;

        const storeProduct = new FindStoreProductService();

        const productStore = await storeProduct.execute({
            store
        });

        return res.json(productStore);

    }

}

export { FindStoreProductController }