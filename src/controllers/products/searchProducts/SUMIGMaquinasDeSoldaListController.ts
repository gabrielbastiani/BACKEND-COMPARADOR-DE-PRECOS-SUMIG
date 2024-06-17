import { Request, Response } from "express";
import { SUMIGMaquinasDeSoldaListService } from "../../../services/products/searchProducts/SUMIGMaquinasDeSoldaListService";

class SUMIGMaquinasDeSoldaListController {
    async handle(req: Request, res: Response) {

        const maquinasDeSolda = new SUMIGMaquinasDeSoldaListService();

        const maquinasDeSoldas = await maquinasDeSolda.execute();

        return res.json(maquinasDeSoldas);
    }
}

export { SUMIGMaquinasDeSoldaListController };