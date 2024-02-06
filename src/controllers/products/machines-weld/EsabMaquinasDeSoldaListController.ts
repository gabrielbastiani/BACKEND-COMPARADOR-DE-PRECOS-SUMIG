import { Request, Response } from "express";
import { EsabMaquinasDeSoldaListService } from "../../../services/products/machines-weld/EsabMaquinasDeSoldaListService";

class EsabMaquinasDeSoldaListController {
    async handle(req: Request, res: Response) {

        const maquinasDeSolda = new EsabMaquinasDeSoldaListService();

        const maquinasDeSoldas = await maquinasDeSolda.execute();

        return res.json(maquinasDeSoldas);
    }
}

export { EsabMaquinasDeSoldaListController };