import { Request, Response } from "express";
import { SearchMachinesStoresService } from "../../../services/products/searchMachines/SearchMachinesStoresService";

class SearchMachinesStoresController {
    async handle(req: Request, res: Response) {
        const { url_search, stores } = req.body;

        const search = new SearchMachinesStoresService();

        const machines = await search.execute({ url_search, stores });

        return res.json(machines);
    }
}

export { SearchMachinesStoresController };