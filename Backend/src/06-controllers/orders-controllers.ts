import express, { NextFunction, Request, Response } from "express";
import { OrderModel } from "../03-models/order-model";
import cartProductsLogic from "../05-logic/cart-products-logic";
import ordersLogic from "../05-logic/orders-logic";


const router = express.Router();


router.get("/orders", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const orders = await ordersLogic.getAllOrders()
        response.json(orders)
    }
    catch (err: any) {
        next(err);
    }
});


router.post("/orders", async (request: Request, response: Response, next: NextFunction) => {
    try {
       const order = new OrderModel(request.body)
       const newOrder = await ordersLogic.addOrder(order)
       response.status(201).json(newOrder)
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/orders/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        await ordersLogic.deleteOrder(_id)
        response.sendStatus(204)
    }
    catch (err: any) {
        next(err);
    }
});


router.get("/orders-count", async (request: Request, response: Response, next: NextFunction) => {
    try {
        
        const count = await ordersLogic.countOrders()
        response.json(count)
    }
    catch (err: any) {
        next(err);
    }
});


export default router;