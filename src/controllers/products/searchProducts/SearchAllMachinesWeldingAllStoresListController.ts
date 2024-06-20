import { Request, Response } from "express";
import { SearchAllMachinesWeldingAllStoresListService } from "../../../services/products/searchProducts/SearchAllMachinesWeldingAllStoresListService";
import { SUMIGMachinesWeldingSearchService } from "../../../services/products/searchProducts/SUMIGMachinesWeldingSearchService";
import { ESABMachinesWeldingSearchService } from "../../../services/products/searchProducts/ESABMachinesWeldingSearchService";

class SearchAllMachinesWeldingAllStoresListController {
    async handle(req: Request, res: Response) {

        const maquinasAllDeSolda = new SearchAllMachinesWeldingAllStoresListService();
        const maquinasAllDeSoldas = await maquinasAllDeSolda.execute();

        const maquinasSumigDeSolda = new SUMIGMachinesWeldingSearchService();
        const maquinasSumigDeSoldas = await maquinasSumigDeSolda.execute();

        const maquinasEsabDeSolda = new ESABMachinesWeldingSearchService();
        const maquinasEsabDeSoldas = await maquinasEsabDeSolda.execute();

        return res.json([maquinasAllDeSoldas, maquinasSumigDeSoldas, maquinasEsabDeSoldas]);
    }
}

export { SearchAllMachinesWeldingAllStoresListController };