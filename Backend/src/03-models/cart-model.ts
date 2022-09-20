import { Document, model, Schema } from "mongoose";
import { UserModel } from "./user-model";

export interface ICartModel extends Document {
    userId: Schema.Types.ObjectId
    date: Date
    // isClosed: boolean 

}

const CartSchema = new Schema<ICartModel>({
    userId: Schema.Types.ObjectId,
    date: {
        type: Date,
        required: [true, "Missing date"],
        
    },
    // isClosed: {
    //     type: Boolean
    // }
  

 
 }, {
     versionKey: false, // Don't create __v field for versioning
     toJSON: { virtuals: true }, // When converting db to json - allow to bring virtual fields
     id: false // Don't duplicate _id into id field
 });

// Virtual Fields:
CartSchema.virtual("users", {
    ref: UserModel,
    localField: "userId",
    foreignField: "_id",
    justOne: true
});


 export const CartModel = model<ICartModel>("CartModel", CartSchema, "carts");