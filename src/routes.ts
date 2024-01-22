import { Router } from "express";
import multer from 'multer';
import uploadConfig from './config/multer';

// -- USERS
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";





const router = Router();
const upload = multer(uploadConfig.upload("./images"));
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { RecoveryPasswordController } from "./controllers/user/passwordRecovery/RecoveryPasswordController";

// -- USERS
router.post('/create_user', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);
router.put('/recover_password', new RecoveryPasswordController().handle);



export { router }