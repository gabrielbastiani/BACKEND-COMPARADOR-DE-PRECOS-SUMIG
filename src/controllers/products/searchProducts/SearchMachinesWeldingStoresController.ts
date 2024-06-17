import { Request, Response } from "express";
import { SearchMachinesWeldingStoresService } from "../../../services/products/searchProducts/SearchMachinesWeldingStoresService";

class SearchMachinesWeldingStoresController {
    async handle(req: Request, res: Response) {

        const urlSearchStore = req.query.urlSearchStore as string;
        const stores = req.query.stores as string;

        const search = new SearchMachinesWeldingStoresService();

        const machines = await search.execute({ urlSearchStore, stores });

        return res.json(machines);
    }
}

export { SearchMachinesWeldingStoresController };