import { Request, Response } from 'express';
import { UpdateNameUserService } from '../../services/user/UpdateNameUserService';

class UpdateNameUserController {
    async handle(req: Request, res: Response) {
        const user_id = req.query.user_id as string;

        const { name } = req.body;

        const updateUserService = new UpdateNameUserService();

        const userUpdated = await updateUserService.execute({
            user_id,
            name
        });

        return res.json(userUpdated);

    }

}

export { UpdateNameUserController }