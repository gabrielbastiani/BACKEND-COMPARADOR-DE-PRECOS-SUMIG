import { Request, Response } from 'express';
import { CreateProductService } from '../../services/products/CreateProductService';

class CreateProductController {
    async handle(req: Request, res: Response) {
        const storeProduct_id = req.query.storeProduct_id as string;

        const { store, title_product, price } = req.body;

        const createProduct = new CreateProductService();

        const product = await createProduct.execute({
            storeProduct_id,
            store,
            title_product,
            price
        });

        return res.json(product);

    }

}

export { CreateProductController }