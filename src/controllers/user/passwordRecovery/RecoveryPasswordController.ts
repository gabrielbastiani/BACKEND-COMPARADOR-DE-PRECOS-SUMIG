import { Request, Response } from "express";
import { PasswordRecoveryService } from "../../../services/user/passwordRecovery/PasswordRecoveryService";  

class RecoveryPasswordController {
  async handle(req: Request, res: Response) {
    const passwordRecoveryUser_id = req.query.passwordRecoveryUser_id as string;

    const { password } = req.body;

    const passwordRecovery = new PasswordRecoveryService();

    const recoveryPassword = await passwordRecovery.execute({
      passwordRecoveryUser_id,
      password,
    });

    return res.json(recoveryPassword)
  }

}


export { RecoveryPasswordController };