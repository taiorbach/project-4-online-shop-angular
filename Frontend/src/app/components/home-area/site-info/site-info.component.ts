import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { CartModel } from 'src/app/models/cart.model';
import { OrderModel } from 'src/app/models/order.model';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { CartsService } from 'src/app/services/carts.service';
import { NotifyService } from 'src/app/services/notify.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-site-info',
  templateUrl: './site-info.component.html',
  styleUrls: ['./site-info.component.css']
})
export class SiteInfoComponent implements OnInit {

  numOfProducts: number
  numOfOrders: number
  user: UserModel
  unsubscribe: Unsubscribe
  cart: CartModel
  order: OrderModel
  
  constructor(private productsService: ProductsService, private ordersService: OrdersService, private cartsService: CartsService, private notify: NotifyService) { }


  
 async ngOnInit() {
  try{
    this.numOfProducts = await this.productsService.countProducts()
    this.numOfOrders = await this.ordersService.countOrder()
    this.unsubscribe = store.subscribe(() => {
      this.user = store.getState().authState.user
      
    })
  }
  catch(err: any){
    this.notify.error(err)
  }
  }

  ordersDetails(){
    this.numOfOrders
    if(this.numOfOrders > 0){
      return `We got ${this.numOfOrders} orders so far`
    }
   return "We got no orders at the moment"
  }

}
