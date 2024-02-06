import { Request, Response } from "express";
import { AmazonMaquinasDeSoldaListService } from "../../../services/products/machines-weld/AmazonMaquinasDeSoldaListService";

class AmazonMaquinasDeSoldaListController {
    async handle(req: Request, res: Response) {

        const maquinasDeSolda = new AmazonMaquinasDeSoldaListService();

        const maquinasDeSoldas = await maquinasDeSolda.execute();

        return res.json(maquinasDeSoldas);
    }
}

export { AmazonMaquinasDeSoldaListController };