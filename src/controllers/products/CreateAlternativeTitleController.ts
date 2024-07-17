import { Request, Response } from "express";
import { CreateAlternativeTitleService } from "../../services/products/CreateAlternativeTitleService";

class CreateAlternativeTitleController {
    async handle(req: Request, res: Response) {
        const {
            slug_title,
            title_alternative
        } = req.body;

        const alternative = new CreateAlternativeTitleService();

        const titleAlternative = await alternative.execute({
            slug_title,
            title_alternative
        });

        return res.json(titleAlternative);

    }
}

export { CreateAlternativeTitleController }