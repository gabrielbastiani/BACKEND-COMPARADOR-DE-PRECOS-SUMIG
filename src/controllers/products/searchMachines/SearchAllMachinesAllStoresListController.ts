import { Request, Response } from "express";
import { SearchAllMachinesAllStoresListService } from "../../../services/products/searchMachines/SearchAllMachinesAllStoresListService";

class SearchAllMachinesAllStoresListController {
    async handle(req: Request, res: Response) {

        const maquinasDeSolda = new SearchAllMachinesAllStoresListService();

        const maquinasDeSoldas = await maquinasDeSolda.execute();

        return res.json(maquinasDeSoldas);
    }
}

export { SearchAllMachinesAllStoresListController };