import { CartModel } from "./cart.model"
import { UserModel } from "./user.model"

export class OrderModel{
    public _id: string
    public totalPrice: number
    public city: string
    public street: string
    public date: Date
    public dateToDeliver: Date
    public lastNumbersInCard: number
    public userId: string
    public user: UserModel
    public cartId: string
    public cart: CartModel
    public isDone: boolean

}