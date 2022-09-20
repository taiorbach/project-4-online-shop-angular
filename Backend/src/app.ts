
import dotenv from "dotenv";
dotenv.config(); // Read .env file into process.env

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "./01-utils/config";
import errorsHandler from "./02-middleware/errors-handler";
import ErrorModel from "./03-models/error-model";
import dal from "./04-dal/dal";
dal.connect();
import expressFileUpload from "express-fileupload";
import expressRateLimit from "express-rate-limit"
import productsController from "./06-controllers/products-controller";
import authController from "./06-controllers/auth-controller"
import cartsController from "./06-controllers/cart-controller"
import ordersController from "./06-controllers/orders-controllers"
import cartProductsController from "./06-controllers/cart-products-controller"
import sanitize from "./02-middleware/sanitize";

const server = express();

server.use("/" , expressRateLimit({
    windowMs: 1000,
    max: 1000,
    message: "Please try again later..."
}))

if (config.isDevelopment) server.use(cors());
server.use(express.json());
server.use(expressFileUpload())
server.use(sanitize)

server.use("/api", authController);
server.use("/api", productsController);
server.use("/api", ordersController);
server.use("/api", cartsController)
server.use("/api", cartProductsController)

server.use("*", (request: Request, response: Response, next: NextFunction) => {
    next(new ErrorModel(404, "Route not found."));
});

server.use(errorsHandler);

server.listen(process.env.PORT, () => console.log("Listening..."));
