import express, { NextFunction, Request, Response } from "express";
import cartProductsLogic from "../05-logic/cart-products-logic";
import { CartProductModel } from "../03-models/cart-products-model";


const router = express.Router()

//
router.get("/products-by-cart/:cartId", async (request: Request, response: Response, next: NextFunction) => {
    try {
       const cartId = request.params.cartId
       const products = await cartProductsLogic.getAllProductsByCart(cartId)
       response.json(products)
        
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/products-by-cart/:cartId/:productId", async (request: Request, response: Response, next: NextFunction) => {
    try {
       const cartId = request.params.cartId
       const productId = request.params.productId
       const product = await cartProductsLogic.getOneProductFromCart(cartId, productId)
       response.json(product)
        
    }
    catch (err: any) {
        next(err);
    }
});


router.post("/cart-products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        console.log('post cart prod')
       const product = new CartProductModel(request.body)
       const addedProduct = await cartProductsLogic.addProductToCart(product)
       console.log(addedProduct)
       response.status(201).json(addedProduct)    
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/cart-products/:productId", async (request: Request, response: Response, next: NextFunction) => {
    try {
       const productId = request.params.productId
       await cartProductsLogic.deleteProduct(productId)
       response.sendStatus(204)    
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/cart-products/clear/:cartId", async (request: Request, response: Response, next: NextFunction) => {
    try {
       const cartId = request.params.cartId
       await cartProductsLogic.clearCart(cartId)
       response.sendStatus(204)
    }
    catch (err: any) {
        next(err);
    }
});


router.put("/cart-products/:cartProductId", async (request: Request, response: Response, next: NextFunction) => {
    try {
       const cartProductId = request.params.cartProductId
       const product = new CartProductModel(request.body)
       const updatedProduct = await cartProductsLogic.updateCartProduct(product)
       response.json(updatedProduct)
    }
    catch (err: any) {
        next(err);
    }
});







export default router;