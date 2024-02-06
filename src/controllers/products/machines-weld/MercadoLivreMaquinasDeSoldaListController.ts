import { Request, Response } from "express";
import { MercadoLivreMaquinasDeSoldaListService } from "../../../services/products/machines-weld/MercadoLivreMaquinasDeSoldaListService";

class MercadoLivreMaquinasDeSoldaListController {
    async handle(req: Request, res: Response) {

        const maquinasDeSolda = new MercadoLivreMaquinasDeSoldaListService();

        const maquinasDeSoldas = await maquinasDeSolda.execute();

        return res.json(maquinasDeSoldas);
    }
}

export { MercadoLivreMaquinasDeSoldaListController };