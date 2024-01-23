import { Request, Response } from "express";
import { FindRecoveryIDUserService } from "../../../services/user/passwordRecovery/FindRecoveryIDUserService";

class FindRecoveryIDUserController {
    async handle(req: Request, res: Response) {

        const findRecoveryIDService = new FindRecoveryIDUserService();

        const recoveryPassword = await findRecoveryIDService.execute();

        return res.json(recoveryPassword)
    }

}

export { FindRecoveryIDUserController };