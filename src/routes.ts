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
import { FindUniqueUserController } from "./controllers/user/FindUniqueUserController";
import { DeleteUserController } from "./controllers/user/DeleteUserController";

// -- CATEGORY -- //
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { UpdateNameCategoryController } from "./controllers/category/UpdateNameCategoryController";
import { FindUniqueCategoryController } from "./controllers/category/FindUniqueCategoryController";
import { UpdateOrderCategoryController } from "./controllers/category/UpdateOrderCategoryController";
import { UpdateImageCategoryController } from "./controllers/category/UpdateImageCategoryController";
import { UpdateStatusCategoryController } from "./controllers/category/UpdateStatusCategoryController";
import { DeleteCategoryController } from "./controllers/category/DeleteCategoryController";
import { CreateSubCategoryController } from "./controllers/category/CreateSubCategoryController"
import { AllCategorysController } from "./controllers/category/AllCategorysController";

// -- SEARCH IN STORES -- //
import { SearchMachinesStoresController } from "./controllers/products/searchMachines/SearchMachinesStoresController";
import { EsabSearchController } from "./controllers/products/searchMachines/EsabSearchController";
import { SUMIGMaquinasDeSoldaListController } from "./controllers/products/searchMachines/SUMIGMaquinasDeSoldaListController";
import { UpdateBrandProductController } from "./controllers/products/UpdateBrandProductController";
import { SearchAllMachinesAllStoresListController } from "./controllers/products/searchMachines/SearchAllMachinesAllStoresListController";

// -- PRODUCTS -- //
import { CreateProductController } from "./controllers/products/CreateProductController";
import { ListAllProductController } from "./controllers/products/ListAllProductController";
import { StoreListProductController } from "./controllers/products/StoreListProductController";
import { DeleteProductController } from "./controllers/products/DeleteProductController";
import { SubCategorysController } from "./controllers/category/SubCategorysController";
import { FindStoreProductController } from "./controllers/products/searchMachines/FindStoreProductController";
import { UpdateTypeCategoryController } from "./controllers/category/UpdateTypeCategoryController";
import { RegisterProductController } from "./controllers/products/RegisterProductController";
import { FindUniqueProductController } from "./controllers/products/FindUniqueProductController";

// -- PRODUCTS CATEGORYS -- //
import { CreateProductCategoryController } from "./controllers/productCategory/CreateProductCategoryController";
import { ListCategoryProductController } from "./controllers/productCategory/ListCategoryProductController";
import { UpdateOrderProductController } from "./controllers/productCategory/UpdateOrderProductController";
import { DeleteProductCategoryController } from "./controllers/productCategory/DeleteProductCategoryController";
import { ListProductsCategoryController } from "./controllers/productCategory/ListProductsCategoryController";



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
router.get('/find_unique_user', isAuthenticated, new FindUniqueUserController().handle);
router.delete('/delete_user', isAuthenticated, new DeleteUserController().handle);

// -- CATEGORY -- //
router.post('/create_category', isAuthenticated, upload.single('file'), new CreateCategoryController().handle);
router.post('/create_subcategory', isAuthenticated, new CreateSubCategoryController().handle);
router.get('/all_categorys', isAuthenticated, new AllCategorysController().handle);
router.get('/find_unique_category', isAuthenticated, new FindUniqueCategoryController().handle);
router.put('/update_name_category', isAuthenticated, new UpdateNameCategoryController().handle);
router.put('/update_order_category', isAuthenticated, new UpdateOrderCategoryController().handle);
router.put('/update_image_category', isAuthenticated, upload.single('file'), new UpdateImageCategoryController().handle);
router.put('/update_type_category', isAuthenticated, new UpdateTypeCategoryController().handle);
router.put('/update_status_category', isAuthenticated, new UpdateStatusCategoryController().handle);
router.delete('/delete_category', isAuthenticated, new DeleteCategoryController().handle);
router.get('/sub_categorys_category', isAuthenticated, new SubCategorysController().handle);

// -- SEARCH IN STORES -- //
router.get('/search_products', isAuthenticated, new SearchMachinesStoresController().handle);
router.get('/esab_machines_weld', isAuthenticated, new EsabSearchController().handle);
router.get('/sumig_machines_weld', isAuthenticated, new SUMIGMaquinasDeSoldaListController().handle);
router.put('/update_brand', isAuthenticated, new UpdateBrandProductController().handle);
router.get('/findDataStore', isAuthenticated, new FindStoreProductController().handle);
router.get('/search_all_stores_machines', isAuthenticated, new SearchAllMachinesAllStoresListController().handle);

// -- PRODUCTS -- //
router.post('/create_product', isAuthenticated, new CreateProductController().handle);
router.get('/list_all_products', isAuthenticated, new ListAllProductController().handle);
router.get('/store_products', isAuthenticated, new StoreListProductController().handle);
router.delete('/delete_product', isAuthenticated, new DeleteProductController().handle);
router.get('/register_products', isAuthenticated, new RegisterProductController().handle);
router.get('/find_product_history', isAuthenticated, new FindUniqueProductController().handle);

// -- PRODUCTS CATEGORYS -- //
router.post('/create_category_product', isAuthenticated, new CreateProductCategoryController().handle);
router.get('/list_categorys_product', isAuthenticated, new ListCategoryProductController().handle);
router.put('/update_positionCategory_product', isAuthenticated, new UpdateOrderProductController().handle);
router.delete('/delete_category_product', isAuthenticated, new DeleteProductCategoryController().handle);
router.get('/products_category', isAuthenticated, new ListProductsCategoryController().handle);


export { router }