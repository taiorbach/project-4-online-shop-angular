import { UserModel } from "./user.model"

export class CartModel {
    public _id: string
    public date: Date
    public userId: string
    public user: UserModel
    public isClosed: boolean
}