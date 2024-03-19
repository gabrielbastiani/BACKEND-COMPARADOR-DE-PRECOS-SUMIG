import { Request, Response } from 'express';
import { SubCategorysService } from '../../services/category/SubCategorysService'; 

class SubCategorysController {
    async handle(req: Request, res: Response) {

        const parentId = req.query.parentId as string;

        const listAll = new SubCategorysService();
        const categorys = await listAll.execute({
            parentId
        });

        return res.json(categorys);

    }

}

export { SubCategorysController }