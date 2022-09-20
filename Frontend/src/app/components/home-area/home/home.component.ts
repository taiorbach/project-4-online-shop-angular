import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderModel } from 'src/app/models/order.model';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user: UserModel
  constructor(private router: Router, private ordersService: OrdersService) { }

  async ngOnInit() {
    this.user = store.getState().authState.user
    if(this.user){
      this.router.navigateByUrl("/shop")
    }
   
  }

}
