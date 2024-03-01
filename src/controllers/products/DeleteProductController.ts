import { Request, Response } from 'express';
import { DeleteProductService } from '../../services/products/DeleteProductService';

class DeleteProductController {
    async handle(req: Request, res: Response) {
        const product_id = req.query.product_id as string;

        const deleteProduct = new DeleteProductService();

        const productDelete = await deleteProduct.execute({
            product_id
        });

        return res.json(productDelete);

    }

}

export { DeleteProductController }