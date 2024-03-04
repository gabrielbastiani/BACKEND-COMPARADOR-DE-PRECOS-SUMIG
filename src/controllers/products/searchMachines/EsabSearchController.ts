import { Request, Response } from "express";
import { EsabSearchService } from "../../../services/products/searchMachines/EsabSearchService";

class EsabSearchController {
    async handle(req: Request, res: Response) {

        const seacrh = new EsabSearchService();

        const products = await seacrh.execute();

        return res.json(products);
    }
}

export { EsabSearchController };