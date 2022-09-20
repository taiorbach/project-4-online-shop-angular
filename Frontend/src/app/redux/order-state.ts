import { OrderModel } from "../models/order.model";


export class OrderState {
    orders: OrderModel[]
}

export enum OrdersActionType{
    FetchOrders = "FetchOrders"
}

export interface OrdersAction {
    type: OrdersActionType
    payload: any
}

export function fetchOrdersAction(orders: OrderModel[]): OrdersAction{
    return {type: OrdersActionType.FetchOrders, payload: orders}
}

export function ordersReducers(currentState = new OrderState(), action: OrdersAction): OrderState{
    const newState = {...currentState}

    switch(action.type){
        case OrdersActionType.FetchOrders:
            newState.orders = action.payload
        break
    }
    return newState
}