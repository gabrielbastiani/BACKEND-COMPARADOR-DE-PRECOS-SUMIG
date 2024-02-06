import { Request, Response } from "express";
import { MadeiraMadeiraMaquinasDeSoldaListService } from "../../../services/products/machines-weld/MadeiraMadeiraMaquinasDeSoldaListService";

class MadeiraMadeiraMaquinasDeSoldaListController {
    async handle(req: Request, res: Response) {

        const maquinasDeSolda = new MadeiraMadeiraMaquinasDeSoldaListService();

        const maquinasDeSoldas = await maquinasDeSolda.execute();

        return res.json(maquinasDeSoldas);
    }
}

export { MadeiraMadeiraMaquinasDeSoldaListController };