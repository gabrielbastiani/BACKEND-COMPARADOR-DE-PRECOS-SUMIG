import { Request, Response } from "express";
import { FerramentasKennedyMaquinasDeSoldaListService } from "../../../services/products/machines-weld/FerramentasKennedyMaquinasDeSoldaListService";

class FerramentasKennedyMaquinasDeSoldaListController {
    async handle(req: Request, res: Response) {

        const maquinasDeSolda = new FerramentasKennedyMaquinasDeSoldaListService();

        const maquinasDeSoldas = await maquinasDeSolda.execute();

        return res.json(maquinasDeSoldas);
    }
}

export { FerramentasKennedyMaquinasDeSoldaListController };