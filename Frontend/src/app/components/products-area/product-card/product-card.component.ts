import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import { CartProductModel } from 'src/app/models/cart-product.model';
import { CartModel } from 'src/app/models/cart.model';
import { ProductModel } from 'src/app/models/product.model';
import store from 'src/app/redux/store';
import { CartsService } from 'src/app/services/carts.service';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit , OnDestroy {

  public cartProduct: CartProductModel
  public cartProducts: CartProductModel[]
  public cart: CartModel
  public productImageUrl = environment.productsImagesUrl
  public quantity: number = 1
  private unsubscribe: Unsubscribe

  
  

  constructor(public dialog: MatDialog, private cartsService: CartsService, private notify: NotifyService, private router: Router) { }

  @Input()
  public product: ProductModel
  
  

 async ngOnInit(){
  this.cart = store.getState().cartsState.cart
  this.cartProducts = store.getState().cartsState.cartProducts
  this.unsubscribe = store.subscribe(() => {
    this.cart = store.getState().cartsState.cart
    this.cartProducts = store.getState().cartsState.cartProducts
  })
  }
 

 

 public async addToCart(){
  const index = this.cartProducts.findIndex((cp) => cp.productId === this.product._id)
  if(index < 0){
    try{  
      let addedCartProduct = new CartProductModel()
      let cartId = store.getState().cartsState.cart._id
      addedCartProduct.productId = this.product._id
      addedCartProduct.price = this.product.price
      addedCartProduct.name = this.product.name
      addedCartProduct.quantity = this.quantity
      addedCartProduct.cartId = cartId
      addedCartProduct.totalPrice = this.product.price * this.quantity
      await this.cartsService.addProductToCart(addedCartProduct)
     this.notify.success("Product had been added to your cart")
    }
    catch(err:any){
      this.notify.error(err)
    }
  }
  else{
    this.notify.error("This product already in your cart")
    return
  }
  
 
 }

 public openDialog(){
  let dialogRef = this.dialog.open(ProductDialogComponent)
  dialogRef.afterClosed().subscribe((result) => {
    this.quantity = result
    this.addToCart()
  })
 }


 ngOnDestroy(){
  this.unsubscribe()
}

}