import { Request, Response } from 'express';
import { PagesStoreListProductService } from '../../services/products/PagesStoreListProductService';

class PagesStoreListProductController {
    async handle(req: Request, res: Response) {
        const {
            page,
            pageSize,
            filter,
            slug
        } = req.query;

        const storeProduct = new PagesStoreListProductService();

        const productStore = await storeProduct.execute(
            Number(page),
            Number(pageSize),
            String(filter),
            String(slug)
        );

        return res.json(productStore);

    }

}

export { PagesStoreListProductController }