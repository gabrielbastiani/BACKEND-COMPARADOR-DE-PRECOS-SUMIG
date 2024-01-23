import { Request, Response } from 'express';
import { UpdateEmailUserService } from '../../services/user/UpdateEmailUserService';

class UpdateEmailUserController {
    async handle(req: Request, res: Response) {
        const user_id = req.query.user_id as string;

        const { email } = req.body;

        const updateUserService = new UpdateEmailUserService();

        const userUpdated = await updateUserService.execute({
            user_id,
            email
        });

        return res.json(userUpdated);

    }

}

export { UpdateEmailUserController }