import { Router, Request, Response } from "express";
import multer from 'multer';
import uploadConfig from './config/multer';

// -- USERS
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";




const router = Router();
const upload = multer(uploadConfig.upload("./images"));

// -- USERS
router.post('/create_user', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', new DetailUserController().handle);


export { router }