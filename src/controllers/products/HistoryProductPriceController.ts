import { Request, Response } from 'express';
import { HistoryProductPricesService } from '../../services/products/HistoryProductPricesService';

class HistoryProductPriceController {
    async handle(req: Request, res: Response) {
        const slug_title_product = req.query.slug_title_product as string;

        const storeProduct = new HistoryProductPricesService();

        const productStore = await storeProduct.execute({
            slug_title_product
        });

        return res.json(productStore);

    }

}

export { HistoryProductPriceController }