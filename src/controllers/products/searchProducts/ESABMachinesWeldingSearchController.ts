import { Request, Response } from "express";
import { ESABMachinesWeldingSearchService } from "../../../services/products/searchProducts/ESABMachinesWeldingSearchService";

class ESABMachinesWeldingSearchController {
    async handle(req: Request, res: Response) {

        const seacrh = new ESABMachinesWeldingSearchService();

        const products = await seacrh.execute();

        return res.json(products);
    }
}

export { ESABMachinesWeldingSearchController };