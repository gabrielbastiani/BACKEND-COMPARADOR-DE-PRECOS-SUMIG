import { Request, Response } from "express";
import { MaquinasDeSoldaListService } from "../../services/products/MaquinasDeSoldaListService";

class MaquinasDeSoldaListController {
    async handle(req: Request, res: Response) {

        const maquinasDeSolda = new MaquinasDeSoldaListService();

        const maquinasDeSoldas = await maquinasDeSolda.execute();

        return res.json(maquinasDeSoldas);
    }
}

export { MaquinasDeSoldaListController };