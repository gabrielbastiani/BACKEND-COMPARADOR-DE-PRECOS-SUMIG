import { Request, Response } from "express";
import { SUMIGMachinesWeldingSearchService } from "../../../services/products/searchProducts/SUMIGMachinesWeldingSearchService";

class SUMIGMachinesWeldingSearchController {
    async handle(req: Request, res: Response) {

        const maquinasDeSolda = new SUMIGMachinesWeldingSearchService();

        const maquinasDeSoldas = await maquinasDeSolda.execute();

        return res.json(maquinasDeSoldas);
    }
}

export { SUMIGMachinesWeldingSearchController };