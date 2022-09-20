import { Document, model, Schema } from "mongoose";

import { CartModel } from "./cart-model";
import { UserModel } from "./user-model";


export interface IOrderModel extends Document {
    userId:Schema.Types.ObjectId
    cartId: Schema.Types.ObjectId
    totalPrice: number
    city: string
    street: string
    date: Date
    dateToDeliver: Date
    lastNumbersInCard: number
    isDone: boolean
}

const OrderSchema = new Schema<IOrderModel>({
    userId: Schema.Types.ObjectId,
    cartId: Schema.Types.ObjectId,
    totalPrice: {
        type: Number,
        min: [0, "Final price can't be negative"],
        max: [100000, "Final price can't exceed 100,000"]
    },
    city: {
        type: String,
        trim: true,
        required: [true, "Missing ship city"],
        minlength: [2, "Ship city too short"],
        maxlength: [100, "Ship city too long"],
    },
    street: {
        type: String,
        trim: true,
        required: [true, "Missing ship street"],
        minlength: [2, "Ship street too short"],
        maxlength: [100, "Ship street too long"]

    },
    date: {
        type: Date,
        required: [true, "Missing order date"]
    },
    dateToDeliver: {
        type: Date,
        required: [true, "Missing delivery date"],

    },
    lastNumbersInCard: {
        type: Number,
        required: [true, "Missing last card numbers"],
        minlength: [4, "Must be more 4 numbers"],
        maxlength: [4, "Must be more 4 numbers"],
        trim: true,
        
    },
    isDone: {
        type: Boolean
    }

 
 }, {
     versionKey: false, // Don't create __v field for versioning
     toJSON: { virtuals: true }, // When converting db to json - allow to bring virtual fields
     id: false // Don't duplicate _id into id field
 });


OrderSchema.virtual("cart", {
    ref: CartModel,
    localField: "cartId",
    foreignField: "_id",
    justOne: true
});

OrderSchema.virtual("user", {
    ref: UserModel,
    localField: "userId",
    foreignField: "_id",
    justOne: true
});


 export const OrderModel = model<IOrderModel>("OrderModel", OrderSchema, "orders");