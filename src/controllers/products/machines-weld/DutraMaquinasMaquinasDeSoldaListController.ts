import { Request, Response } from "express";
import { DutraMaquinasMaquinasDeSoldaListService } from "../../../services/products/machines-weld/DutraMaquinasMaquinasDeSoldaListService";

class DutraMaquinasMaquinasDeSoldaListController {
    async handle(req: Request, res: Response) {

        const maquinasDeSolda = new DutraMaquinasMaquinasDeSoldaListService();

        const maquinasDeSoldas = await maquinasDeSolda.execute();

        return res.json(maquinasDeSoldas);
    }
}

export { DutraMaquinasMaquinasDeSoldaListController };