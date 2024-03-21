import { Request, Response } from "express";
import { SearchMachinesStoresService } from "../../../services/products/searchMachines/SearchMachinesStoresService";

class SearchMachinesStoresController {
    async handle(req: Request, res: Response) {

        const urlSearchStore = req.query.urlSearchStore as string;
        const stores = req.query.stores as string;

        const search = new SearchMachinesStoresService();

        const machines = await search.execute({ urlSearchStore, stores });

        return res.json(machines);
    }
}

export { SearchMachinesStoresController };