import { Router } from "express";
import multer from 'multer';
import uploadConfig from './config/multer';
import { isAuthenticated } from "./middlewares/isAuthenticated";


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

// -- CATEGORY -- //
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { UpdateNameCategoryController } from "./controllers/category/UpdateNameCategoryController";
import { UpdateOrderCategoryController } from "./controllers/category/UpdateOrderCategoryController";
import { UpdateImageCategoryController } from "./controllers/category/UpdateImageCategoryController";
import { UpdateStatusCategoryController } from "./controllers/category/UpdateStatusCategoryController";

// -- PRODUCTS -- //
import { AmericanasMaquinasDeSoldaListController } from "./controllers/products/machines-weld/AmericanasMaquinasDeSoldaListController";
import { LojaDoMecanicoMaquinasDeSoldaListController } from "./controllers/products/machines-weld/LojaDoMecanicoMaquinasDeSoldaListController";
import { AmazonMaquinasDeSoldaListController } from "./controllers/products/machines-weld/AmazonMaquinasDeSoldaListController";
import { MagaLuMaquinasDeSoldaListController } from "./controllers/products/machines-weld/MagaLuMaquinasDeSoldaListController";
import { MercadoLivreMaquinasDeSoldaListController } from "./controllers/products/machines-weld/MercadoLivreMaquinasDeSoldaListController";
import { EsabMaquinasDeSoldaListController } from "./controllers/products/machines-weld/EsabMaquinasDeSoldaListController";
import { CarrefourMaquinasDeSoldaListController } from "./controllers/products/machines-weld/CarrefourMaquinasDeSoldaListController";
import { DutraMaquinasMaquinasDeSoldaListController } from "./controllers/products/machines-weld/DutraMaquinasMaquinasDeSoldaListController";
import { ShopeeMaquinasDeSoldaListController } from "./controllers/products/machines-weld/ShopeeMaquinasDeSoldaListController";
import { CasasBahiaMaquinasDeSoldaListController } from "./controllers/products/machines-weld/CasasBahiaMaquinasDeSoldaListController";
import { PontoFrioMaquinasDeSoldaListController } from "./controllers/products/machines-weld/PontoFrioMaquinasDeSoldaListController";
import { MadeiraMadeiraMaquinasDeSoldaListController } from "./controllers/products/machines-weld/MadeiraMadeiraMaquinasDeSoldaListController";
import { LeroyMerlinMaquinasDeSoldaListController } from "./controllers/products/machines-weld/LeroyMerlinMaquinasDeSoldaListController";
import { FerramentasKennedyMaquinasDeSoldaListController } from "./controllers/products/machines-weld/FerramentasKennedyMaquinasDeSoldaListController";
import { SUMIGMaquinasDeSoldaListController } from "./controllers/products/machines-weld/SUMIGMaquinasDeSoldaListController";
import { UpdateBrandProductController } from "./controllers/products/UpdateBrandProductController";
import { CreateProductController } from "./controllers/products/CreateProductController";
import { ListAllProductController } from "./controllers/products/ListAllProductController";
import { StoreListProductController } from "./controllers/products/StoreListProductController";



const router = Router();
const upload = multer(uploadConfig.upload("./images"));



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

// -- CATEGORY -- //
router.post('/create_category', isAuthenticated, upload.single('file'), new CreateCategoryController().handle);
router.put('/update_name_category', isAuthenticated, new UpdateNameCategoryController().handle);
router.put('/update_order_category', isAuthenticated, new UpdateOrderCategoryController().handle);
router.put('/update_image_category', isAuthenticated, upload.single('file'), new UpdateImageCategoryController().handle);
router.put('/update_status_category', isAuthenticated, new UpdateStatusCategoryController().handle);

// -- STORES -- //
router.get('/americanas_machines_weld', isAuthenticated, new AmericanasMaquinasDeSoldaListController().handle);
router.get('/loja_do_mecanico_machines_weld', isAuthenticated, new LojaDoMecanicoMaquinasDeSoldaListController().handle);
router.get('/amazon_machines_weld', isAuthenticated, new AmazonMaquinasDeSoldaListController().handle);
router.get('/magalu_machines_weld', isAuthenticated, new MagaLuMaquinasDeSoldaListController().handle);
router.get('/mercado_livre_machines_weld', isAuthenticated, new MercadoLivreMaquinasDeSoldaListController().handle);
router.get('/esab_machines_weld', isAuthenticated, new EsabMaquinasDeSoldaListController().handle);
router.get('/carrefour_machines_weld', isAuthenticated, new CarrefourMaquinasDeSoldaListController().handle);
router.get('/dutra_maquinas_machines_weld', isAuthenticated, new DutraMaquinasMaquinasDeSoldaListController().handle);
router.get('/shopee_machines_weld', isAuthenticated, new ShopeeMaquinasDeSoldaListController().handle);
router.get('/casas_bahia_machines_weld', isAuthenticated, new CasasBahiaMaquinasDeSoldaListController().handle);
router.get('/ponto_frio_machines_weld', isAuthenticated, new PontoFrioMaquinasDeSoldaListController().handle);
router.get('/madeiramadeira_machines_weld', isAuthenticated, new MadeiraMadeiraMaquinasDeSoldaListController().handle);
router.get('/leroy_merlin_machines_weld', isAuthenticated, new LeroyMerlinMaquinasDeSoldaListController().handle);
router.get('/ferramentas_kennedy_machines_weld', isAuthenticated, new FerramentasKennedyMaquinasDeSoldaListController().handle);
router.get('/sumig_machines_weld', isAuthenticated, new SUMIGMaquinasDeSoldaListController().handle);
router.put('/update_brand', isAuthenticated, new UpdateBrandProductController().handle);

// -- PRODUCTS -- //
router.post('/create_product', isAuthenticated, new CreateProductController().handle);
router.get('/list_all_products', isAuthenticated, new ListAllProductController().handle);
router.get('/store_products', isAuthenticated, new StoreListProductController().handle);


export { router }