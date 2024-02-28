import { Request, Response } from 'express';
import { UpdateBrandProductService } from '../../services/products/UpdateBrandProductService';

class UpdateBrandProductController {
    async handle(req: Request, res: Response) {
        const storeProduct_id = req.query.storeProduct_id as string;

        const { brand } = req.body;

        const updateBrand = new UpdateBrandProductService();

        const brandUpdate = await updateBrand.execute({
            storeProduct_id,
            brand
        });

        return res.json(brandUpdate);

    }

}

export { UpdateBrandProductController }