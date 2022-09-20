import ErrorModel from "../03-models/error-model";
import { IProductModel, ProductModel } from "../03-models/product-model";
import {v4 as uuid} from "uuid"
import { CategoryModel, ICategoryModel } from "../03-models/category-model";



async function getAllProducts(): Promise<IProductModel[]>{
    return ProductModel.find().populate("category").exec()
}

async function getOneProduct(_id: string): Promise<IProductModel>{
    const product = await ProductModel.findById(_id).populate("category").exec()
    if(!product) throw new ErrorModel(404, `_id ${_id} not found`)
    return product
}

async function addProduct(product: IProductModel): Promise<IProductModel>{
    if(product.image){
    const extension = product.image.name.substring(product.image.name.lastIndexOf("."))
    product.imageName = uuid() + extension
    await product.image.mv("./src/assets/images/products/" + product.imageName)
    }
    const errors = product.validateSync()
    if(errors) throw new ErrorModel(400 , errors.message)
    product.image = undefined
    const addedProduct = await product.save()
    return addedProduct
}

async function updateProduct(product: IProductModel): Promise<IProductModel>{
    const errors = product.validateSync()
    if(errors) throw new ErrorModel(400 , errors.message)

    if(product.image){
        const extension = product.image.name.substring(product.image.name.lastIndexOf("."))
        product.imageName = uuid() + extension
        await product.image.mv("./src/assets/images/products/" + product.imageName)
        product.image = undefined
        }
    const updatedProduct = await ProductModel.findByIdAndUpdate(product._id, product, {returnOriginal: false}).exec()
    if(!updateProduct) throw new ErrorModel(404, `_id ${product._id} not found`)

    return updatedProduct
}

async function deleteProduct(_id: string): Promise<void>{ // DELETE FROM products...
    const deletedProduct = await ProductModel.findByIdAndDelete(_id).exec()
    if(!deletedProduct) throw new ErrorModel(404, `_id ${_id} not found`)
}

async function getAllCategories(): Promise<ICategoryModel[]>{
    return CategoryModel.find().exec()
}

async function getProductsByCategory(categoryId: string): Promise<IProductModel[]>{
    return ProductModel.find( {categoryId} ).populate('category').exec()
}

async function countProducts(): Promise<number>{
    return ProductModel.find().count().exec()
}

export default {
    getAllProducts,
    getOneProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    getAllCategories,
    getProductsByCategory,
    countProducts
   
};