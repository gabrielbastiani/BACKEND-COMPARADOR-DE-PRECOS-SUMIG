import { Request, Response } from "express";
import { PontoFrioMaquinasDeSoldaListService } from "../../../services/products/machines-weld/PontoFrioMaquinasDeSoldaListService";

class PontoFrioMaquinasDeSoldaListController {
    async handle(req: Request, res: Response) {

        const maquinasDeSolda = new PontoFrioMaquinasDeSoldaListService();

        const maquinasDeSoldas = await maquinasDeSolda.execute();

        return res.json(maquinasDeSoldas);
    }
}

export { PontoFrioMaquinasDeSoldaListController };