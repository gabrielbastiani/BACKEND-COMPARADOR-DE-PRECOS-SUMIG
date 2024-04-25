import { Request, Response } from 'express';
import { RegisterProductService } from '../../services/products/RegisterProductService';

class RegisterProductController {
    async handle(req: Request, res: Response) {
        const slug = req.query.slug as string;

        const storeProduct = new RegisterProductService();

        const productStore = await storeProduct.execute({
            slug
        });

        return res.json(productStore);

    }

}

export { RegisterProductController }