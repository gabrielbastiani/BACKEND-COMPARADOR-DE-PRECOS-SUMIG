import { Request, Response } from "express";
import { MagaLuMaquinasDeSoldaListService } from "../../../services/products/machines-weld/MagaLuMaquinasDeSoldaListService";

class MagaLuMaquinasDeSoldaListController {
    async handle(req: Request, res: Response) {

        const maquinasDeSolda = new MagaLuMaquinasDeSoldaListService();

        const maquinasDeSoldas = await maquinasDeSolda.execute();

        return res.json(maquinasDeSoldas);
    }
}

export { MagaLuMaquinasDeSoldaListController };