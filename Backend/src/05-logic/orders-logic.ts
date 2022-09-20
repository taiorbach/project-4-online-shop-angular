import ErrorModel from "../03-models/error-model";
import { IOrderModel, OrderModel } from "../03-models/order-model";

async function getAllOrders(): Promise<IOrderModel[]>{
    return OrderModel.find().populate("cart").populate("user").exec()
}


async function getOrderById(_id: string ): Promise<IOrderModel>{
    return await OrderModel.findById(_id).populate("cart").populate("user").exec()
   
 }

async function addOrder(order: IOrderModel): Promise<IOrderModel>{
    const dateToDeliver = await checkOrdersDates(order.dateToDeliver)
    if(dateToDeliver >= 3){
        throw new ErrorModel(400, "There are too many deliveries on this date")
    }
    const errors = order.validateSync()
    if(errors) throw new ErrorModel(400, errors.message)
    return order.save()
}

async function deleteOrder(_id: string): Promise<void>{
    const deletedOrder = await OrderModel.findByIdAndDelete(_id).exec()
    if(!deletedOrder) throw new ErrorModel(404 , `_id ${_id} not found`)
}

async function countOrders(): Promise<number>{
    return OrderModel.find().count().exec()
}

async function checkOrdersDates(dateToDeliver: Date): Promise<number>{
    return OrderModel.find({dateToDeliver}).count().exec()
}






export default {
    getAllOrders,
    getOrderById,
    addOrder,
    deleteOrder,
    countOrders,
    checkOrdersDates
}


