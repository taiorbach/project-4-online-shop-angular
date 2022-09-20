import jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"
import { IUserModel } from "../03-models/user-model"


function hash(plainText: string): string{

    if(!plainText) return null

    const hashedText = bcrypt.hashSync(plainText , 10)

    return hashedText
}


function verifyHash(password: string , hash) {
    return bcrypt.compareSync(password , hash)
}



const secretKey = "AwesomeLife"

function getNewToken(user: IUserModel): string{
    
    const payload = {user}

    const token = jwt.sign(payload , secretKey , {expiresIn: "1h"})

    return token
}


function verifyToken(authorizationHeader: string): Promise<boolean> {

    return new Promise((res , rej) => {

        if(!authorizationHeader){
            res(false)
            return
        }

        const token = authorizationHeader.split(" ")[1]

        if(!token) {
            res(false)
            return
            
        }

        jwt.verify(token , secretKey , (err) => {

            if(err){
                res(false)
                return
            }

            res(true)
        })
    })
}

function getUserFromToken(authorizationHeader: string): IUserModel {
    const token = authorizationHeader.split(" ")[1]

    const payload: any = jwt.decode(token)

    const user = payload.user

    return user
}



export default {
    hash,
    getNewToken,
    verifyToken,
    verifyHash,
    getUserFromToken
};
