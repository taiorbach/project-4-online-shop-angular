import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth-state";
import { cartsReducer } from "./carts-state";
import { categoriesReducer } from "./categories-state";
import { ordersReducers } from "./order-state";
import { productsReducer } from "./products-state";
import { composeWithDevTools } from "redux-devtools-extension";



const reducers = combineReducers({
    authState: authReducer,
    productsState: productsReducer,
    categoriesState: categoriesReducer,
    ordersState: ordersReducers,
    cartsState: cartsReducer
})

 const store = createStore(reducers, composeWithDevTools());


export default store