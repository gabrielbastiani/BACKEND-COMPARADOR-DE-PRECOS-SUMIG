import { Request, Response } from 'express';
import { AllCategoryService } from '../../services/category/AllCategoryService'; 

class AllCategoryController {
    async handle(req: Request, res: Response) {

        const listAll = new AllCategoryService();
        const categorys = await listAll.execute();

        return res.json(categorys);

    }

}

export { AllCategoryController }