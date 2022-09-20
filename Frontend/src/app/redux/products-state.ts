import { ProductModel } from "../models/product.model";


export class ProductsState{
    public products: ProductModel[] = []
}

export enum ProductsActionType{
    FetchProducts = "FetchProducts",
    AddProduct = "AddProduct",
    UpdateProduct = "UpdateProduct",
    DeleteProduct = "DeleteProduct",
}

export interface ProductsAction {
    type: ProductsActionType
    payload: any
}

export function fetchProductsAction(products: ProductModel[]): ProductsAction{
    return { type: ProductsActionType.FetchProducts, payload: products}
}
export function addProductsAction(products: ProductModel): ProductsAction{
    return { type: ProductsActionType.AddProduct, payload: products}
}
export function updateProductsAction(products: ProductModel): ProductsAction{
    return { type: ProductsActionType.UpdateProduct, payload: products}
}
export function deleteProductsAction(_id: string): ProductsAction{
    return { type: ProductsActionType.DeleteProduct, payload: _id }
}


export function productsReducer(currentState = new ProductsState(), action: ProductsAction): ProductsState{
    const newState = { ...currentState }

    switch(action.type){
        case ProductsActionType.FetchProducts:
            newState.products = action.payload
            break
        
        case ProductsActionType.AddProduct:
            newState.products.push(action.payload)
            break

        case ProductsActionType.UpdateProduct:
            const indexToUpdate = newState.products.findIndex(p => p._id === action.payload._id)
            if(indexToUpdate >= 0){
                newState.products[indexToUpdate] = action.payload
            }   
            break

        case ProductsActionType.DeleteProduct:
            const indexToDelete = newState.products.findIndex(p => p._id === action.payload)    
            if(indexToDelete >= 0){
                newState.products.splice(indexToDelete, 1)
            }
            break
    }

    return newState
}