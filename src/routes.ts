import { Router, Request, Response } from "express";
import multer from 'multer';

import uploadConfig from './config/multer';

const router = Router();
const upload = multer(uploadConfig.upload("./images"));

router.get('/teste', (req: Request, res: Response) => {
    return res.json({ ok: true })
});

export { router }