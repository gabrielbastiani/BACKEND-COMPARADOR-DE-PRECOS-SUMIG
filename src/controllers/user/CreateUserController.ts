import { Request, Response } from 'express'
import { CreateUserService } from '../../services/user/CreateUserService';

class CreateUserController {
    async handle(req: Request, res: Response) {
        const {
            name,
            slug,
            email,
            password
        } = req.body;

        const createUserService = new CreateUserService();

        const users = await createUserService.execute({
            name,
            slug,
            email,
            password
        });

        return res.json(users)
    }
}

export { CreateUserController }