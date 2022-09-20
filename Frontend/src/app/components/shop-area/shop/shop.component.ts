import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartProductModel } from 'src/app/models/cart-product.model';
import { CartModel } from 'src/app/models/cart.model';
import { ProductModel } from 'src/app/models/product.model';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { CartsService } from 'src/app/services/carts.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  public user: UserModel
  public cart: CartModel
  public opened = false
  
 
 
  constructor(private router: Router, private authService: AuthService, private productsService: ProductsService) { }

  async ngOnInit() {
    this.user = store.getState().authState.user
    this.cart = store.getState().cartsState.cart
    
   
  }


 

}


