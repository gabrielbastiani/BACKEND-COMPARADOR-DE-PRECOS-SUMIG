import { Request, Response } from 'express';
import { FindUniqueProductService } from '../../services/products/FindUniqueProductService';

class FindUniqueProductController {
    async handle(req: Request, res: Response) {
        const slug_title_product = req.query.slug_title_product as string;
        const slug = req.query.slug as string;

        const storeProduct = new FindUniqueProductService();

        const productStore = await storeProduct.execute({
            slug_title_product,
            slug
        });

        return res.json(productStore);

    }

}

export { FindUniqueProductController }