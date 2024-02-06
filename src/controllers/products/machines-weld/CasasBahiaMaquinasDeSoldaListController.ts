import { Request, Response } from "express";
import { CasasBahiaMaquinasDeSoldaListService } from "../../../services/products/machines-weld/CasasBahiaMaquinasDeSoldaListService";

class CasasBahiaMaquinasDeSoldaListController {
    async handle(req: Request, res: Response) {

        const maquinasDeSolda = new CasasBahiaMaquinasDeSoldaListService();

        const maquinasDeSoldas = await maquinasDeSolda.execute();

        return res.json(maquinasDeSoldas);
    }
}

export { CasasBahiaMaquinasDeSoldaListController };