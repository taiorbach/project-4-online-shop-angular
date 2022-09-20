import { CartProductModel, ICartProductModel } from "../03-models/cart-products-model";
import ErrorModel from "../03-models/error-model";



//
async function getAllProductsByCart(cartId: string): Promise<ICartProductModel[]>{
    const cartProducts =  CartProductModel.find({ cartId: cartId }).populate("products").exec()
    if(!cartProducts) throw new ErrorModel(404, "There is no products in this cart")
    return cartProducts
}

async function getOneProductFromCart(cartId: string , productId: string ): Promise<ICartProductModel>{
    const product = await CartProductModel.findOne({cartId , productId}).populate("products").exec()
    if(!product) throw new ErrorModel(404, "This product is not exist in the cart")
    return product
}

//
async function updateCartProduct(cartProduct: ICartProductModel): Promise<ICartProductModel>{
    const updatedProduct = await CartProductModel.findByIdAndUpdate(cartProduct._id, cartProduct,{returnOriginal: false}).exec()
    if(!updatedProduct) throw new ErrorModel(404, "Cart product not found")
    return updatedProduct
}


async function addProductToCart( product: ICartProductModel): Promise<ICartProductModel>{
    const addedCartProduct = await product.save()
    return addedCartProduct
}



//
async function deleteProduct(_id: string): Promise<void>{
    const deletedProduct = await CartProductModel.findByIdAndDelete({_id}).exec()
    if(!deletedProduct) throw new ErrorModel(404, `Cart with _id ${_id} not found`)
}
//
async function clearCart(cartId: string): Promise<void>{
    const clearedCart = await CartProductModel.deleteMany({ cartId: cartId }).exec()
    if(!clearedCart) throw new ErrorModel(404, `Cart with _id ${cartId} not found`)
}

export default {
    getAllProductsByCart,
    getOneProductFromCart,
    updateCartProduct,
    deleteProduct,
    clearCart,
    addProductToCart
}