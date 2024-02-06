import { Request, Response } from "express";
import { LojaDoMecanicoMaquinasDeSoldaListService } from "../../../services/products/machines-weld/LojaDoMecanicoMaquinasDeSoldaListService";

class LojaDoMecanicoMaquinasDeSoldaListController {
    async handle(req: Request, res: Response) {

        const maquinasDeSolda = new LojaDoMecanicoMaquinasDeSoldaListService();

        const maquinasDeSoldas = await maquinasDeSolda.execute();

        return res.json(maquinasDeSoldas);
    }
}

export { LojaDoMecanicoMaquinasDeSoldaListController };