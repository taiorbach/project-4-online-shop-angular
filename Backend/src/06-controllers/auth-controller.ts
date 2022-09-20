import express, { NextFunction, Request, Response } from "express";
import { CredentialsModel } from "../03-models/credentials-model";
import { UserModel } from "../03-models/user-model";
import authLogic from "../05-logic/auth-logic";


const router = express.Router();


router.post("/auth/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body)
        const token = await authLogic.register(user)
        response.status(201).json(token)
        
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/auth/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
       const credentials = new CredentialsModel(request.body)
       const token = await authLogic.login(credentials)
       response.json(token)
        
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/auth/users", async (request: Request, response: Response, next: NextFunction) => {
    try {
      const users = await authLogic.getAllUsers()
      response.json(users)

    }
    catch (err: any) {
        next(err);
    }
});

router.get("/auth/users/:idNumber", async (request: Request, response: Response, next: NextFunction) => {
    try {
     const idNumber = +request.params.idNumber
     const user = await authLogic.getUserByIdNumber(idNumber)
     response.json(user)

    }
    catch (err: any) {
        next(err);
    }
});


export default router;