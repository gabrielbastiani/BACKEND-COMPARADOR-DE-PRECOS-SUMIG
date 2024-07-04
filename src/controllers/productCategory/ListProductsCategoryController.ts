import { Request, Response } from 'express';
import { ListProductsCategoryService } from '../../services/productCategory/ListProductsCategoryService'; 

class ListProductsCategoryController {
    async handle(req: Request, res: Response) {
        const {
            id, page, limit, filter, sort, order, minPrice, maxPrice
        } = req.query;

        const parsedMinPrice = minPrice ? parseFloat(minPrice as string) : undefined;
        const parsedMaxPrice = maxPrice ? parseFloat(maxPrice as string) : undefined;

        const storeProduct = new ListProductsCategoryService();

        const productStore = await storeProduct.execute(
            id as string,
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

export { ListProductsCategoryController }