import { Request, Response } from "express";
import { SearchMachinesStoresService } from "../../../services/products/searchMachines/SearchMachinesStoresService";

class SearchMachinesStoresController {
    async handle(req: Request, res: Response) {
        
        const { urlSearchStore, stores } = req.body;

        const search = new SearchMachinesStoresService();

        const machines = await search.execute({ urlSearchStore, stores });

        return res.json(machines);
    }
}

export { SearchMachinesStoresController };