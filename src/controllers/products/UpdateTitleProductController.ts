import { Request, Response } from 'express';
import { UpdateTitleProductService } from '../../services/products/UpdateTitleProductService';

class UpdateTitleProductController {
    async handle(req: Request, res: Response) {

        const createProduct = new UpdateTitleProductService();

        const product = await createProduct.execute();

        return res.json(product);

    }

}

export { UpdateTitleProductController }