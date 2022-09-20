import express, { NextFunction, Request, Response } from "express";
import verifyAdmin from "../02-middleware/verify-admin";
import verifyLoggedIn from "../02-middleware/verify-logged-in";
import { ProductModel } from "../03-models/product-model";
import productsLogic from "../05-logic/products-logic";
import path from "path"


const router = express.Router();


router.get("/products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = await productsLogic.getAllProducts()
        response.json(products)
        
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/categories", async (request: Request, response: Response, next: NextFunction) => {
    try {
       const categories = await productsLogic.getAllCategories()
       response.json(categories)
        
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/products/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
       const _id = request.params._id
       const product = await productsLogic.getOneProduct(_id)
       response.json(product)
        
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/products",  async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image
        const product = new ProductModel(request.body)
        const addedProduct = await productsLogic.addProduct(product)
        response.status(201).json(addedProduct)
        
    }
    catch (err: any) {
        next(err);
    }
});

router.put("/products/:_id",  async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image
        request.body._id = request.params._id
        const product = new ProductModel(request.body)
        const updatedProduct = await productsLogic.updateProduct(product)
        response.json(updatedProduct)
        
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/products/:_id",  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id
        await productsLogic.deleteProduct(_id)
        response.sendStatus(204)
        
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/products/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName
        const absolutePath = path.join(__dirname , ".." , "assets" , "images" , "products" , imageName)
        response.sendFile(absolutePath)
        
    }
    catch (err: any) {
        next(err);
    }
})

router.get("/products-count", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const count = await productsLogic.countProducts()
        response.json(count)
        
    }
    catch (err: any) {
        next(err);
    }
})

router.get("/products-by-category/:categoryId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const categoryId = request.params.categoryId
        const products = await productsLogic.getProductsByCategory(categoryId)
        response.json(products)
        
    }
    catch (err: any) {
        next(err);
    }
})



export default router;