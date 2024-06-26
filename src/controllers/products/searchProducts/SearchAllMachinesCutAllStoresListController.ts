import { Request, Response } from "express";
import { SearchAllMachinesCutAllStoresListService } from "../../../services/products/searchProducts/SearchAllMachinesCutAllStoresListService";
import { SUMIGMachinesCutSearchService } from "../../../services/products/searchProducts/SUMIGMachinesCutSearchService";
import { ESABMachinesCutSearchService } from "../../../services/products/searchProducts/ESABMachinesCutSearchService";

class SearchAllMachinesCutAllStoresListController {
    async handle(req: Request, res: Response) {

        const maquinasAllDeCorte = new SearchAllMachinesCutAllStoresListService();
        const maquinasAllDeCut = await maquinasAllDeCorte.execute();

        const maquinasSumigDeCorte = new SUMIGMachinesCutSearchService();
        const maquinasSumigDeCut = await maquinasSumigDeCorte.execute();

        const maquinasEsabDeCorte = new ESABMachinesCutSearchService();
        const maquinasEsabDeCut = await maquinasEsabDeCorte.execute();

        return res.json([maquinasAllDeCut, maquinasSumigDeCut, maquinasEsabDeCut]);
    }
}

export { SearchAllMachinesCutAllStoresListController };