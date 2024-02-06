import { Request, Response } from "express";
import { LeroyMerlinMaquinasDeSoldaListService } from "../../../services/products/machines-weld/LeroyMerlinMaquinasDeSoldaListService";

class LeroyMerlinMaquinasDeSoldaListController {
    async handle(req: Request, res: Response) {

        const maquinasDeSolda = new LeroyMerlinMaquinasDeSoldaListService();

        const maquinasDeSoldas = await maquinasDeSolda.execute();

        return res.json(maquinasDeSoldas);
    }
}

export { LeroyMerlinMaquinasDeSoldaListController };