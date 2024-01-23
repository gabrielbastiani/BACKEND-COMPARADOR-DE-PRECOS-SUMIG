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

        if (!req.file) {
            throw new Error("error upload file");
        } else {

            const { originalname, filename: image } = req.file;

            const category = await categorys.execute({
                name,
                nivel,
                parentId,
                order,
                image
            });

            return res.json(category);

        }

    }
}

export { CreateCategoryController }