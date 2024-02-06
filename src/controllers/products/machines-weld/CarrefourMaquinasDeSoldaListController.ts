import { Request, Response } from "express";
import { CarrefourMaquinasDeSoldaListService } from "../../../services/products/machines-weld/CarrefourMaquinasDeSoldaListService";

class CarrefourMaquinasDeSoldaListController {
    async handle(req: Request, res: Response) {

        const maquinasDeSolda = new CarrefourMaquinasDeSoldaListService();

        const maquinasDeSoldas = await maquinasDeSolda.execute();

        return res.json(maquinasDeSoldas);
    }
}

export { CarrefourMaquinasDeSoldaListController };