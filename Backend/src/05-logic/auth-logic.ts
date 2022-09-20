import { userInfo } from "os";
import cyber from "../01-utils/cyber";
import { ICredentialsModel } from "../03-models/credentials-model";
import ErrorModel from "../03-models/error-model";
import RoleModel from "../03-models/role-model";
import { IUserModel, UserModel } from "../03-models/user-model";

async function register(user: IUserModel): Promise<string>{
    const errors = user.validateSync()
    if(errors) throw new ErrorModel(400, errors.message)

    const isEmailTaken = await isEmailExist(user)
    if(isEmailTaken){
        throw new ErrorModel(400 , `email ${user.email} already taken`)
    }

    const isIdNumTaken = await isUserIdNumberTaken(user)
    if(isIdNumTaken){
        throw new ErrorModel(400 , `Id number ${user.idNumber} already taken`)
    }

    user.password = cyber.hash(user.password)

    user.role = RoleModel.User
    
    user.save()
    
    const token = cyber.getNewToken(user)
    
    return token
}

async function login(credentials: ICredentialsModel): Promise<string>{
    const errors = credentials.validateSync()
    if(errors) throw new ErrorModel(400, errors.message)

    // credentials.password = cyber.hash(credentials.password)

    const users = await UserModel.find({email: credentials.email}).exec()

   

    if(users.length === 0 ){
        throw new ErrorModel(401, "Incorrect email or password")
    }

    const user = users[0]
    console.log(` User ${user.firstName}  ${user.lastName} - logged in`)

    const isHashValid = cyber.verifyHash(credentials.password , user.password)

    if(!isHashValid) {
        throw new ErrorModel(401 , "incorrect email or password")
    }

    const token = cyber.getNewToken(user)
    return token

}

async function getAllUsers(): Promise<IUserModel[]>{
    return UserModel.find().exec()
}

async function getUserByIdNumber(idNumber: number): Promise<IUserModel>{
    return UserModel.findOne({ idNumber: idNumber}).exec()
}

async function isEmailExist(user: IUserModel): Promise<boolean>{
   user = await UserModel.findOne({email: user.email}).exec()
   if(!user){
       return false
   }
   else{
       return true
   }
}

async function isUserIdNumberTaken(user: IUserModel): Promise<boolean>{
    user = await UserModel.findOne({userIdNumber: user.idNumber}).exec()
    if(!user){
        return true
    }
    else{
        return false
    }
}

export default {
    register,
    login,
    getAllUsers,
    getUserByIdNumber,
    isUserIdNumberTaken,
    isEmailExist
};

