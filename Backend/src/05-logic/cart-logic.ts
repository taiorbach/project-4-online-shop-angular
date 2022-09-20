import ErrorModel from "../03-models/error-model";
import { CartModel, ICartModel } from "../03-models/cart-model";



async function getAllCarts(): Promise<ICartModel[]>{
    return CartModel.find().populate("users").exec()
}

async function getCart(userId: string): Promise<ICartModel>{
    let existCart = await getCartByUser(userId)
    if(existCart){
        return existCart
    }
        let newCart = await createCart(userId)
        const createdCart = await newCart.save()
        return createdCart  
    
}

async function getCartByUser(userId: string): Promise<ICartModel>{
    const cart = await CartModel.findOne({ userId: userId }).exec()
    if(cart){
        return cart
    }
    let newCart = await createCart(userId)
    const createdCart = await newCart.save()
    return createdCart
}

async function deleteCart(_id: string): Promise<void>{
    const deletedCart = await CartModel.findByIdAndDelete(_id).exec()
    if(!deletedCart) throw new ErrorModel(404 , `_id ${_id} not found`)
}



async function createCart(userId: string): Promise<ICartModel>{
    let date = new Date()
    let isClosed = false
    const cart = new CartModel({userId: userId , date: date, isClosed: false})
    return cart
}


// async function closeCart(_id: string): Promise<ICartModel>{
//     await CartModel.updateOne({_id} , {$set: {isClosed: true}}).exec()
//     const cart = await CartModel.findOne({_id}).exec()
//     return cart
// }
    

export default {
    getAllCarts,
    deleteCart,
    getCartByUser,
    getCart,
    // closeCart,
    createCart
    
    
}
