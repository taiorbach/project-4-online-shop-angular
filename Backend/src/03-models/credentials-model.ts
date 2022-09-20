import { Document, model, Schema } from "mongoose";

export interface ICredentialsModel extends Document {
    email: string
    password: string
}



const CredentialsSchema = new Schema<ICredentialsModel>({
    email: {
        type: String,
        required: [true, "Missing email"],
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
        minlength: [7 , "Email too short"],
        maxlength: [50, "Email too long"]
    },
    password: {
       type: String,
       required: [true, "Missing password"],
       trim: true,
       minlength: [7, "Password too short"],
       maxlength: [100, "Password too long"]
    }
}, {
    versionKey: false, 
    toJSON: { virtuals: true }, 
    id: false 
});

 export const CredentialsModel = model<ICredentialsModel>("CredentialsModel", CredentialsSchema, "users");