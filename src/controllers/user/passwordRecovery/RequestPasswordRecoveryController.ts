import { Request, Response } from "express";
import { RequestPasswordRecoveryService } from "../../../services/user/passwordRecovery/RequestPasswordRecoveryService"; 

class RequestPasswordRecoveryController {
  async handle(req: Request, res: Response) {
    const { email } = req.body;

    const requestPasswordRecovery = new RequestPasswordRecoveryService();

    const user = await requestPasswordRecovery.execute({
      email,
    });

    return res.json(user)
  }
}

export { RequestPasswordRecoveryController };