import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";

class CreateCategoryController {
    async handle(req: Request, res: Response) {
        const {
            name,
            nivel,
            parentId,
            order
        } = req.body;

        const categorys = new CreateCategoryService();

        const category = await categorys.execute({
            name,
            nivel,
            parentId,
            order
        });

        return res.json(category);

    }
}

export { CreateCategoryController }