import { Request, Response } from 'express';
import { UpdateRegisterProductService } from '../../services/products/UpdateRegisterProductService';

class UpdateRegisterProductController {
    async handle(req: Request, res: Response) {
        const storeProduct_id = req.query.storeProduct_id as string;

        const createProduct = new UpdateRegisterProductService();

        const product = await createProduct.execute({
            storeProduct_id
        });

        return res.json(product);

    }

}

export { UpdateRegisterProductController }