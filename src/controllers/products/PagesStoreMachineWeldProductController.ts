import { Request, Response } from 'express';
import { PagesStoreMachineWeldProductService } from '../../services/products/PagesStoreMachineWeldProductService';

class PagesStoreMachineWeldProductController {
    async handle(req: Request, res: Response) {
        const {
            slug, page, limit, filter, sort, order, minPrice, maxPrice
        } = req.query;

        const parsedMinPrice = minPrice ? parseFloat(minPrice as string) : undefined;
        const parsedMaxPrice = maxPrice ? parseFloat(maxPrice as string) : undefined;

        const storeProduct = new PagesStoreMachineWeldProductService();

        const productStore = await storeProduct.execute(
            slug as string,
            page as string,
            limit as string,
            filter as string,
            sort as string,
            order as string,
            parsedMinPrice,
            parsedMaxPrice
        );

        return res.json(productStore);

    }

}

export { PagesStoreMachineWeldProductController }