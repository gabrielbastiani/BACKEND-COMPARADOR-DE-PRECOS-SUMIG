import { Request, Response } from "express";
import { SearchAllMachinesWeldingAllStoresListService } from "../../../services/products/searchProducts/SearchAllMachinesWeldingAllStoresListService";

class SearchAllMachinesWeldingAllStoresListController {
    async handle(req: Request, res: Response) {

        const maquinasDeSolda = new SearchAllMachinesWeldingAllStoresListService();

        const maquinasDeSoldas = await maquinasDeSolda.execute();

        return res.json(maquinasDeSoldas);
    }
}

export { SearchAllMachinesWeldingAllStoresListController };