import { Request, Response } from "express";
import { CaptureCutMachinService } from "../../services/productCategory/CaptureCutMachinService";

class CaptureCutMachinController {
    async handle(req: Request, res: Response) {
        const {
            storeProduct_id,
            slug_title_product,
            store
        } = req.body;

        const productCategory = new CaptureCutMachinService();

        const category = await productCategory.execute({
            storeProduct_id,
            slug_title_product,
            store
        });

        return res.json(category)

    }
}

export { CaptureCutMachinController }