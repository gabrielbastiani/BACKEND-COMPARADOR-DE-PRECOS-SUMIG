import { Request, Response } from 'express';
import { DeleteProductService } from '../../services/products/DeleteProductService';

class DeleteProductController {
    async handle(req: Request, res: Response) {
        const storeProduct_id = req.query.storeProduct_id as string;

        const deleteProduct = new DeleteProductService();

        const productDelete = await deleteProduct.execute({
            storeProduct_id
        });

        return res.json(productDelete);

    }

}

export { DeleteProductController }