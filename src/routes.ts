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
import { UpdateStatusCategoryController } from "./controllers/category/UpdateStatusCategoryController";
import { DeleteCategoryController } from "./controllers/category/DeleteCategoryController";
import { CreateSubCategoryController } from "./controllers/category/CreateSubCategoryController"
import { AllCategorysController } from "./controllers/category/AllCategorysController";

// -- SEARCH IN STORES -- //
import { SearchMachinesWeldingStoresController } from "./controllers/products/searchProducts/SearchMachinesWeldingStoresController";
import { SearchMachinesCutStoresController } from "./controllers/products/searchProducts/SearchMachinesCutStoresController";
import { ESABMachinesWeldingSearchController } from "./controllers/products/searchProducts/ESABMachinesWeldingSearchController";
import { SUMIGMachinesWeldingSearchController } from "./controllers/products/searchProducts/SUMIGMachinesWeldingSearchController";
import { SUMIGMachinesCutSearchController } from "./controllers/products/searchProducts/SUMIGMachinesCutSearchController";
import { ESABMachinesCutSearchController } from "./controllers/products/searchProducts/ESABMachinesCutSearchController";
import { UpdateBrandProductController } from "./controllers/products/UpdateBrandProductController";
import { SearchAllMachinesWeldingAllStoresListController } from "./controllers/products/searchProducts/SearchAllMachinesWeldingAllStoresListController";

// -- PRODUCTS -- //
import { ListAllProductController } from "./controllers/products/ListAllProductController";
import { StoreListProductController } from "./controllers/products/StoreListProductController";
import { SubCategorysController } from "./controllers/category/SubCategorysController";
import { FindStoreProductController } from "./controllers/products/searchProducts/FindStoreProductController";
import { RegisterProductController } from "./controllers/products/RegisterProductController";
import { FindUniqueProductController } from "./controllers/products/FindUniqueProductController";
import { PagesStoreMachineWeldProductController } from "./controllers/products/PagesStoreMachineWeldProductController";
import { PagesStoreMachineCutProductController } from "./controllers/products/PagesStoreMachineCutProductController";
import { SearchAllMachinesCutAllStoresListController } from "./controllers/products/searchProducts/SearchAllMachinesCutAllStoresListController";
import { UpdateTitleProductController } from "./controllers/products/UpdateTitleProductController";
import { ListAllProductStoreController } from "./controllers/products/ListAllProductStoreController";
import { UpdateRegisterProductController } from "./controllers/products/UpdateRegisterProductController";
import { HistoryProductPriceController } from "./controllers/products/HistoryProductPriceController";
import { CreateAlternativeTitleController } from "./controllers/products/CreateAlternativeTitleController";

// -- PRODUCTS CATEGORYS -- //
import { CreateProductCategoryController } from "./controllers/productCategory/CreateProductCategoryController";
import { ListCategoryProductController } from "./controllers/productCategory/ListCategoryProductController";
import { UpdateOrderProductController } from "./controllers/productCategory/UpdateOrderProductController";
import { DeleteProductCategoryController } from "./controllers/productCategory/DeleteProductCategoryController";
import { ListProductsCategoryController } from "./controllers/productCategory/ListProductsCategoryController";
import { ListAllCategoryProductController } from "./controllers/productCategory/ListAllCategoryProductController";
import { CaptureWeldingMachinController } from "./controllers/productCategory/CaptureWeldingMachinController";
import { CaptureCutMachinController } from "./controllers/productCategory/CaptureCutMachinController";

// -- SEARCH MEDIAS SOCIAL -- //
import { SearchSocialMediasController } from "./controllers/searchSocialMedias/SearchSocialMediasController";




const router = Router();



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
router.post('/create_category', isAuthenticated, new CreateCategoryController().handle);
router.post('/create_subcategory', isAuthenticated, new CreateSubCategoryController().handle);
router.get('/all_categorys', isAuthenticated, new AllCategorysController().handle);
router.get('/find_unique_category', isAuthenticated, new FindUniqueCategoryController().handle);
router.put('/update_name_category', isAuthenticated, new UpdateNameCategoryController().handle);
router.put('/update_order_category', isAuthenticated, new UpdateOrderCategoryController().handle);
router.put('/update_status_category', isAuthenticated, new UpdateStatusCategoryController().handle);
router.delete('/delete_category', isAuthenticated, new DeleteCategoryController().handle);
router.get('/sub_categorys_category', isAuthenticated, new SubCategorysController().handle);

// -- SEARCH IN STORES -- //
router.get('/search_machines_welding', isAuthenticated, new SearchMachinesWeldingStoresController().handle);
router.get('/search_machines_cut', isAuthenticated, new SearchMachinesCutStoresController().handle);
router.get('/esab_machines_weld', isAuthenticated, new ESABMachinesWeldingSearchController().handle);
router.get('/esab_machines_cut', isAuthenticated, new ESABMachinesCutSearchController().handle);
router.get('/sumig_machines_weld', isAuthenticated, new SUMIGMachinesWeldingSearchController().handle);
router.get('/sumig_machines_cut', isAuthenticated, new SUMIGMachinesCutSearchController().handle);
router.put('/update_brand', isAuthenticated, new UpdateBrandProductController().handle);
router.get('/findDataStore', isAuthenticated, new FindStoreProductController().handle);
router.get('/search_all_stores_machines', isAuthenticated, new SearchAllMachinesWeldingAllStoresListController().handle);
router.get('/search_all_stores_cuts', isAuthenticated, new SearchAllMachinesCutAllStoresListController().handle);

// -- PRODUCTS -- //
router.put('/update_title_product', isAuthenticated, new UpdateTitleProductController().handle);
router.get('/list_all_products', isAuthenticated, new ListAllProductController().handle);
router.get('/store_products', isAuthenticated, new StoreListProductController().handle);
router.get('/page_products_machine_weld', isAuthenticated, new PagesStoreMachineWeldProductController().handle);
router.get('/page_products_machine_cut', isAuthenticated, new PagesStoreMachineCutProductController().handle);
router.get('/register_products', isAuthenticated, new RegisterProductController().handle);
router.get('/find_product_history', isAuthenticated, new FindUniqueProductController().handle);
router.get('/list_all_products_store', isAuthenticated, new ListAllProductStoreController().handle);
router.put('/update_register_product', isAuthenticated, new UpdateRegisterProductController().handle);
router.get('/history_prices_product', isAuthenticated, new HistoryProductPriceController().handle);
router.post('/create_alternative_title', isAuthenticated, new CreateAlternativeTitleController().handle);

// -- PRODUCTS CATEGORYS -- //
router.post('/capture_product_welding_machine', isAuthenticated, new CaptureWeldingMachinController().handle);
router.post('/capture_product_cut_machine', isAuthenticated, new CaptureCutMachinController().handle);
router.post('/create_category_product', isAuthenticated, new CreateProductCategoryController().handle);
router.get('/list_categorys_product', isAuthenticated, new ListCategoryProductController().handle);
router.get('/list_all_products_categorys', isAuthenticated, new ListAllCategoryProductController().handle);
router.put('/update_positionCategory_product', isAuthenticated, new UpdateOrderProductController().handle);
router.delete('/delete_category_product', isAuthenticated, new DeleteProductCategoryController().handle);
router.get('/products_category', isAuthenticated, new ListProductsCategoryController().handle);

// -- SEARCH MEDIAS SOCIAL -- //
router.get('/search_medias_social', isAuthenticated, new SearchSocialMediasController().handle);


export { router }