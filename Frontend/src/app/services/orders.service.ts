import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderModel } from '../models/order.model';
import store from '../redux/store';
import { fetchOrdersAction } from '../redux/order-state';
import { CartsService } from './carts.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient , private cartsService: CartsService) { }

  async getAllOrders(): Promise<OrderModel[]>{
    if (store.getState().ordersState.orders.length === 0) {
      const orders = await firstValueFrom(this.http.get<OrderModel[]>(environment.ordersUrl))
      store.dispatch(fetchOrdersAction(orders))
    }
    return store.getState().ordersState.orders
  } 

  async addOrder(order: OrderModel): Promise<OrderModel>{
    const addedOrder = await firstValueFrom(this.http.post<OrderModel>(environment.ordersUrl, order))
    return addedOrder
  }

  async countOrder(): Promise<number> {
    const count = await firstValueFrom(this.http.get<number>(environment.countOrdersUrl))
    return count
  }

  
  

}
