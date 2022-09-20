import { CartModel } from "./cart.model"
import { ProductModel } from "./product.model"

export class CartProductModel{
    public _id: string
    public name: string
    public quantity: number
    public price: number
    public totalPrice: number
    public productId: string
    public products: ProductModel
    public cartId: string
    public cart: CartModel
}