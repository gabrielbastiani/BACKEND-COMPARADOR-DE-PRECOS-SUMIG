import { Request, Response } from "express";
import { CreateSubCategoryService } from "../../services/category/CreateSubCategoryService";

class CreateSubCategoryController {
    async handle(req: Request, res: Response) {
        const {
            name,
            nivel,
            parentId,
            order,
            type_category
        } = req.body;

        const categorys = new CreateSubCategoryService();

        const category = await categorys.execute({
            name,
            nivel,
            parentId,
            order,
            type_category
        });

        return res.json(category);

    }
}

export { CreateSubCategoryController }