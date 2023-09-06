import { combineReducers } from "redux";
import { productsReducer, selectedProductsReducer } from "./productsReducer";
import { cartReducer } from "./cartReducer";
import { authReducer } from "./authReducer";


const reducers = combineReducers({
    allProducts: productsReducer,
    product: selectedProductsReducer,
    cart: cartReducer,
    auth: authReducer,
});
export default reducers;