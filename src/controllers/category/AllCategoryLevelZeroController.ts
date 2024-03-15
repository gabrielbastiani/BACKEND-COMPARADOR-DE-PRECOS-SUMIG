import { Request, Response } from 'express';
import { AllCategoryLevelZeroService } from '../../services/category/AllCategoryLevelZeroService'; 

class AllCategoryLevelZeroController {
    async handle(req: Request, res: Response) {

        const listAll = new AllCategoryLevelZeroService();
        const categorys = await listAll.execute();

        return res.json(categorys);

    }

}

export { AllCategoryLevelZeroController }