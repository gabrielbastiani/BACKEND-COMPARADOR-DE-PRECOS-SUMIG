import { Request, Response } from "express";
import { SearchSocialMediasService } from "../../services/searchSocialMedias/searchSocialMediasService"; 

class SearchSocialMediasController {
    async handle(req: Request, res: Response) {

        

        const search = new SearchSocialMediasService();

        const medias = await search.execute();

        return res.json(medias);
    }
}

export { SearchSocialMediasController };