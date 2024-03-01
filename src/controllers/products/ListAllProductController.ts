import { Request, Response } from 'express';
import { ListAllProductService } from '../../services/products/ListAllProductService';

class ListAllProductController {
    async handle(req: Request, res: Response) {

        const listAll = new ListAllProductService();
        const product = await listAll.execute();

        return res.json(product);

    }

}

export { ListAllProductController }