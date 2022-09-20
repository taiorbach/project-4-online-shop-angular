import { CartProductModel } from "../models/cart-product.model"
import { CartModel } from "../models/cart.model"

export class CartsState{
    public cart: CartModel
    public cartProducts: CartProductModel[]
}

export enum CartsActionType{
    FetchCart = "FetchCart",
    FetchCartProducts = "FetchCartProducts",
    AddProductToCart = "AddProductToCArt",
    UpdateProductInCart = "UpdateProductInCart",
    DeleteProductFromCart = "DeleteProductFromCart",
    DeleteAllProductsFromCart = "DeleteAllProductsFromCart"
}

export interface CartsAction{
    type: CartsActionType
    payload: any
}

export function fetchCartAction(cart: CartModel): CartsAction{
    return { type: CartsActionType.FetchCart, payload: cart}
}

export function fetchAllCartProductAction(products: CartProductModel[]): CartsAction{
    return { type: CartsActionType.FetchCartProducts, payload: products}
}

export function addProductToCartAction(product: CartProductModel): CartsAction{
    return { type: CartsActionType.AddProductToCart, payload: product}
}

export function updateProductInCartAction(product: CartProductModel): CartsAction{
    return { type: CartsActionType.UpdateProductInCart, payload: product}
}

export function deleteProductFromCartAction(productId: string): CartsAction{
    return { type: CartsActionType.DeleteProductFromCart, payload: productId}
}

export function deleteAllProductsFromCartAction(cartId: string): CartsAction{
    return { type: CartsActionType.DeleteAllProductsFromCart, payload: cartId}
}

export function cartsReducer(currentState = new CartsState(), action: CartsAction): CartsState{
    const newState = {...currentState}

    switch(action.type){
        case CartsActionType.FetchCart:
            newState.cart = action.payload
            break
        case CartsActionType.FetchCartProducts:
            newState.cartProducts = action.payload
            break
        case CartsActionType.AddProductToCart:
            newState.cartProducts.push(action.payload)
            break
        case CartsActionType.UpdateProductInCart:
                const indexToUpdate = newState.cartProducts.findIndex(c => c._id === action.payload._id)
                if(indexToUpdate >= 0){
                    newState.cartProducts[indexToUpdate] = action.payload
                }
                break 
        case CartsActionType.DeleteProductFromCart:
            const indexToDelete = newState.cartProducts.findIndex(c => c._id === action.payload)
            if(indexToDelete >= 0){
                newState.cartProducts.splice(indexToDelete, 1)
            }    
            break   
        case CartsActionType.DeleteAllProductsFromCart:
            newState.cartProducts = []
            break    

    }   
    return newState
}

