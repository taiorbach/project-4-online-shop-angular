import { CategoryModel } from './category-model';
import { Document, model, Schema } from "mongoose";
import { UploadedFile } from 'express-fileupload';

export interface IProductModel extends Document {
    name: string
    price: number
    image: UploadedFile
    imageName: string
    categoryId: Schema.Types.ObjectId;
}

const ProductSchema = new Schema<IProductModel>({
   name: {
       type: String,
       required: [true, "Missing product name"],
       minlength: [2, "Product name too short"],
       maxlength: [30, "Product name too long"],
       trim: true,
       unique: true,
       match: [/^[A-Z].+$/ , "Name must start with capital letter"]
   },
   price: {
       type: Number,
       required: [true, "Missing product price"],
       min: [0.1 , "Product price cant be free or negative"],
       max: [1000 , "Product price cant exceed 1000"]
   },
   imageName: {
       type: String,
   },
   image: {
       type: Object,
   },
   categoryId: Schema.Types.ObjectId


}, {
    versionKey: false, // Don't create __v field for versioning
    toJSON: { virtuals: true }, // When converting db to json - allow to bring virtual fields
    id: false // Don't duplicate _id into id field
});

// Virtual Fields:
ProductSchema.virtual("category", {
    ref: CategoryModel,
    localField: "categoryId",
    foreignField: "_id" , 
    justOne: true
});



export const ProductModel = model<IProductModel>("ProductModel", ProductSchema, "products");
