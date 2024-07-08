import { Request, Response } from "express";
import { CaptureWeldingMachinService } from "../../services/productCategory/CaptureWeldingMachinService";

class CaptureWeldingMachinController {
    async handle(req: Request, res: Response) {
        const {
            storeProduct_id,
            slug_title_product,
            store
        } = req.body;

        const productCategory = new CaptureWeldingMachinService();

        const category = await productCategory.execute({
            storeProduct_id,
            slug_title_product,
            store
        });

        return res.json(category)

    }
}

export { CaptureWeldingMachinController }