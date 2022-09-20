import { Document, model, Schema } from "mongoose";
import RoleModel from "./role-model";

export interface IUserModel extends Document {
  idNumber: number
  firstName: string
  lastName: string
  email: string
  password: string
  city: string
  street: string
  role: RoleModel
  
}



const UserSchema = new Schema<IUserModel>({

    idNumber: {
       type: Number,
       required: [true, "Missing id number"],
       trim: true,
       unique: true,
       minlength: [9, "Enter valid id number"],
       maxlength: [9, "Enter valid id number"]
      
 
    },
   firstName: {
       type: String,
       required: [true, "Missing first name"],
       minlength: [2, "First name cant be less than 2 chars"],
       maxlength: [10, "First name cant be more than 10 chars"],
       trim: true,

   },
   lastName: {
    type: String,
    required: [true, "Missing first name"],
    minlength: [2, "Last name cant be less than 2 chars"],
    maxlength: [25, "Last name cant be more than 10 chars"],
    trim: true,
   },
   email: {
       type: String,
       required: [true, "Missing email"],
       trim: true,
       unique: true,
       match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
       minlength: [7 , "Email too short"],
       maxlength: [50, "Email too long"]
   },
   password:{
       type: String,
       required: [true, "Missing password"],
       trim: true,
       minlength: [7, "Password too short"],
       maxlength: [100, "Password too long"]

   },
   city: {
       type: String,
       trim: true,

   },
   street: {
       type: String,
       trim: true,
       minlength: [2, "Street is too short"],
       maxlength: [30 , "Street is too long"],

   },
   role: {
       type: Number
   }
}, {
    versionKey: false, 
    toJSON: { virtuals: true }, 
    id: false 
});

 

 export const UserModel = model<IUserModel>("UserModel", UserSchema, "users");