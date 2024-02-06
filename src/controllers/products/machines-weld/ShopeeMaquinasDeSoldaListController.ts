import { Request, Response } from "express";
import { ShopeeMaquinasDeSoldaListService } from "../../../services/products/machines-weld/ShopeeMaquinasDeSoldaListService";

class ShopeeMaquinasDeSoldaListController {
    async handle(req: Request, res: Response) {

        const maquinasDeSolda = new ShopeeMaquinasDeSoldaListService();

        const maquinasDeSoldas = await maquinasDeSolda.execute();

        return res.json(maquinasDeSoldas);
    }
}

export { ShopeeMaquinasDeSoldaListController };