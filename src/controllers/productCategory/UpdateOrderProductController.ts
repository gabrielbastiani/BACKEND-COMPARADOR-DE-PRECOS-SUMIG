import { Request, Response } from 'express';
import { UpdateOrderProductService } from '../../services/productCategory/UpdateOrderProductService';

class UpdateOrderProductController {
    async handle(req: Request, res: Response) {
        const productCategory_id = req.query.productCategory_id as string;

        const { order } = req.body;

        const updateorder = new UpdateOrderProductService();

        const orderCategory = await updateorder.execute({
            productCategory_id,
            order
        });

        return res.json(orderCategory);

    }

}

export { UpdateOrderProductController }