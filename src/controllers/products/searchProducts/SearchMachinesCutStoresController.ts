import { Request, Response } from "express";
import { SearchMachinesCutStoresService } from "../../../services/products/searchProducts/SearchMachinesCutStoresService";

class SearchMachinesCutStoresController {
    async handle(req: Request, res: Response) {

        const urlSearchStore = req.query.urlSearchStore as string;
        const stores = req.query.stores as string;

        const search = new SearchMachinesCutStoresService();

        const machines = await search.execute({ urlSearchStore, stores });

        return res.json(machines);
    }
}

export { SearchMachinesCutStoresController };