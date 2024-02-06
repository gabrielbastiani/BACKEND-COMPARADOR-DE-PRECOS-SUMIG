import { Request, Response } from "express";
import { AmericanasMaquinasDeSoldaListService } from "../../../services/products/machines-weld/AmericanasMaquinasDeSoldaListService";

class AmericanasMaquinasDeSoldaListController {
    async handle(req: Request, res: Response) {

        const maquinasDeSolda = new AmericanasMaquinasDeSoldaListService();

        const maquinasDeSoldas = await maquinasDeSolda.execute();

        return res.json(maquinasDeSoldas);
    }
}

export { AmericanasMaquinasDeSoldaListController };