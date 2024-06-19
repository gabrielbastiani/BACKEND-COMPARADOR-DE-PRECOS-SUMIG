import { Request, Response } from "express";
import { ESABMachinesCutSearchService } from "../../../services/products/searchProducts/ESABMachinesCutSearchService";

class ESABMachinesCutSearchController {
    async handle(req: Request, res: Response) {

        const seacrh = new ESABMachinesCutSearchService();

        const products = await seacrh.execute();

        return res.json(products);
    }
}

export { ESABMachinesCutSearchController };