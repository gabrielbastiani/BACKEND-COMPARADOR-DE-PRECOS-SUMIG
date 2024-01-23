import { Router } from "express";
import multer from 'multer';
import uploadConfig from './config/multer';
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();
const upload = multer(uploadConfig.upload("./images"));

// -- USERS -- //
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { RecoveryPasswordController } from "./controllers/user/passwordRecovery/RecoveryPasswordController";
import { DeletePasswordRecoveryController } from "./controllers/user/passwordRecovery/DeletePasswordRecoveryController";
import { RequestPasswordRecoveryController } from "./controllers/user/passwordRecovery/RequestPasswordRecoveryController";
import { FindRecoveryIDUserController } from "./controllers/user/passwordRecovery/FindRecoveryIDUserController";
import { UpdateNameUserController } from "./controllers/user/UpdateNameUserController";
import { UpdateEmailUserController } from "./controllers/user/UpdateEmailUserController";

// -- USERS -- //
router.post('/create_user', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);
router.put('/update_name_user', isAuthenticated, new UpdateNameUserController().handle);
router.put('/update_email_user', isAuthenticated, new UpdateEmailUserController().handle);
router.put('/recover_password', new RecoveryPasswordController().handle);
router.delete('/delete_recovery_id', isAuthenticated, new DeletePasswordRecoveryController().handle);
router.post('/recovery_email', new RequestPasswordRecoveryController().handle);
router.get('/find_recovery', isAuthenticated, new FindRecoveryIDUserController().handle);


export { router }