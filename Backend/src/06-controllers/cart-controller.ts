import express, { NextFunction, Request, Response } from "express";
import cyber from "../01-utils/cyber";
import cartLogic from "../05-logic/cart-logic";


const router = express.Router();


router.get("/carts", async (request: Request, response: Response, next: NextFunction) => {
    try {
       let authorizationString = request.headers['authorization']    
       const userId = cyber.getUserFromToken(authorizationString)._id
       const cart = await cartLogic.getCartByUser(userId)
       response.json(cart)
    }
    catch (err: any) {
        next(err);
    }
});




router.delete("/carts/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
       const _id = request.params._id
       await cartLogic.deleteCart(_id)
       response.sendStatus(204)
    }
    catch (err: any) {
        next(err);
    }
});


export default router