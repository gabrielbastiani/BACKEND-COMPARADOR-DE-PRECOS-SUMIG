import { Request, Response } from 'express';
import { AllCategorysService } from '../../services/category/AllCategorysService'; 

class AllCategorysController {
    async handle(req: Request, res: Response) {

        const listAll = new AllCategorysService();
        const categorys = await listAll.execute();

        return res.json(categorys);

    }

}

export { AllCategorysController }