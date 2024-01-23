import { Request, Response } from "express";
import { DeletePasswordRecoveryService } from "../../../services/user/passwordRecovery/DeletePasswordRecoveryService"; 


class DeletePasswordRecoveryController {
  async handle(req: Request, res: Response) {
    const passwordRecoveryUser_id = req.query.passwordRecoveryUser_id as string;

    const deletePasswordRecoveryIDService = new DeletePasswordRecoveryService();

    const userRecovery = await deletePasswordRecoveryIDService.execute({
      passwordRecoveryUser_id
    });

    return res.json(userRecovery)
  }
}


export { DeletePasswordRecoveryController };