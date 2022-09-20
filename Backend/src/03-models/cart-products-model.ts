import { Document, model, Schema } from "mongoose";
import { ProductModel } from "./product-model";
import { CartModel } from "./cart-model";


export interface ICartProductModel extends Document {
  name : string
  quantity: number
  totalPrice: number
  price: number
  cartId: Schema.Types.ObjectId
  productId: Schema.Types.ObjectId
}

const CartProductSchema = new Schema<ICartProductModel>({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number,
        required: [true, "Missing amount in quantity"],
        min: [1, "quantity must be 1 or more"], 
        max: [100, "quantity must be 100 or less"]
    },
    totalPrice:{
        type: Number,
        min: [0 , "Total Price cant be negative"]
    } ,
    cartId: Schema.Types.ObjectId,
    productId: Schema.Types.ObjectId
 
 }, {
     versionKey: false, // Don't create __v field for versioning
     toJSON: { virtuals: true }, // When converting db to json - allow to bring virtual fields
     id: false // Don't duplicate _id into id field
 });

// Virtual Fields:
CartProductSchema.virtual("products", {
    ref: ProductModel,
    localField: "productId",
    foreignField: "_id",
    justOne: true
});

CartProductSchema.virtual("carts", {
    ref: CartModel,
    localField: "cartId",
    foreignField: "_id",
    justOne: true
});





 export const CartProductModel = model<ICartProductModel>("CartProductModel", CartProductSchema, "cartProduct");