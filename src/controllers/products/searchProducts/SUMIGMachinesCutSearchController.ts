import { Request, Response } from "express";
import { SUMIGMachinesCutSearchService } from "../../../services/products/searchProducts/SUMIGMachinesCutSearchService";

class SUMIGMachinesCutSearchController {
    async handle(req: Request, res: Response) {

        const machinesCut = new SUMIGMachinesCutSearchService();

        const cutsMachines = await machinesCut.execute();

        return res.json(cutsMachines);
    }
}

export { SUMIGMachinesCutSearchController };