import { Request, Response } from 'express';
import { FindUniqueUserService } from '../../services/user/FindUniqueUserService'; 

class FindUniqueUserController {
  async handle(req: Request, res: Response) {

    const user_id = req.query.user_id as string;

    const detailUser = new FindUniqueUserService();

    const user = await detailUser.execute({ user_id });

    return res.json(user);

  }
}

export { FindUniqueUserController }