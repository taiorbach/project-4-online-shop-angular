import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import { CartProductModel } from 'src/app/models/cart-product.model';
import { CartModel } from 'src/app/models/cart.model';
import { ProductModel } from 'src/app/models/product.model';
import store from 'src/app/redux/store';
import { CartsService } from 'src/app/services/carts.service';
import { NotifyService } from 'src/app/services/notify.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit , OnDestroy{

  public totalPrice: number = 0
  public cartProducts: CartProductModel[]
  public cart: CartModel
  private unsubscribe: Unsubscribe;
  public quantity: number
  public productToUpdate: CartProductModel
  public price: number
  
  
  



  constructor(private cartService: CartsService, private notify: NotifyService, private router: Router) { }

 


  async ngOnInit(){
      this.cart = await this.cartService.getCart()
      this.cartProducts = await this.cartService.getAllProductsByCart(this.cart._id)
      this.totalPrice = this.getTotalPrice(this.cartProducts)

   this.unsubscribe = store.subscribe(() => {
    this.cart = store.getState().cartsState.cart
    this.cartProducts = store.getState().cartsState.cartProducts
    this.totalPrice = this.getTotalPrice(this.cartProducts)
   })
   
  }

  public getTotalPrice(cartProducts: CartProductModel[]): number{
    return cartProducts.reduce((acc, curVal) => acc + curVal.totalPrice, 0)

  }

  public async clearCart(): Promise<void>{
    try{
      if(this.cartProducts.length === 0){
        this.notify.error("Cart is Empty")
        return
      }
      await this.cartService.clearProdcutsFromCart(this.cart._id)
      this.cartProducts = []
      this.totalPrice = 0
      this.notify.success("Cart had been cleared")
    }
    catch(err:any){
      this.notify.error(err)
    }

  }

  public async removeProductFromCart(productId: string): Promise<void>{
    try{
      await this.cartService.deleteProductFromCart(productId)
      this.cartProducts = await this.cartService.getAllProductsByCart(this.cart._id)
      this.totalPrice = this.getTotalPrice(this.cartProducts)
      this.notify.success("Product has been deleted")
    }
    catch(err:any){
      this.notify.error(err)
    }
  }

  public order(){
    if(this.cartProducts.length > 0){
      this.router.navigateByUrl("/order")
    }
    else{
      this.notify.error("Please add products to your cart befor you order")
    }
  }


async updateCartProduct(product: CartProductModel){
  try{
    product.totalPrice = product.price * product.quantity
    this.productToUpdate = await this.cartService.updateProductInCart(product)
    this.totalPrice = this.getTotalPrice(this.cartProducts)
  }
  catch(err:any){
    this.notify.error(err)
  }
  
}





  ngOnDestroy(): void{
    this.unsubscribe()
  }







}

