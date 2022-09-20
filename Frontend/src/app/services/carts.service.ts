import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartProductModel } from '../models/cart-product.model';
import { CartModel } from '../models/cart.model';
import { ProductModel } from '../models/product.model';
import { addProductToCartAction, deleteAllProductsFromCartAction, fetchAllCartProductAction, fetchCartAction, updateProductInCartAction } from '../redux/carts-state';
import store from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http: HttpClient) { }


  //
  async getAllProductsByCart(cartId: string): Promise<CartProductModel[]>{
    let productsByCart =  await firstValueFrom(this.http.get<CartProductModel[]>(environment.cartProductsByCartUrl + cartId))
    store.dispatch(fetchAllCartProductAction(productsByCart))
    return productsByCart
  }

  
  async addProductToCart(product: CartProductModel ): Promise<CartProductModel>{
    const addedProduct = await firstValueFrom(this.http.post<CartProductModel>(environment.cartProductUrl, product))
    store.dispatch(addProductToCartAction(addedProduct))
    return addedProduct
    
  }

  async updateProductInCart(product: CartProductModel ): Promise<CartProductModel>{
     const updatedProduct = await firstValueFrom(this.http.put<CartProductModel>(environment.cartProductUrl + product.productId  , product))
     store.dispatch(updateProductInCartAction(updatedProduct))
    return updatedProduct
  }

  async deleteProductFromCart(productId: string): Promise<void>{
    store.dispatch(deleteAllProductsFromCartAction(productId))
    await firstValueFrom(this.http.delete(environment.cartProductUrl + productId ))
  }
//
  async clearProdcutsFromCart(cartId: string): Promise<void>{
    await firstValueFrom(this.http.delete(environment.cartProductUrl + "clear/" + cartId))
    store.dispatch(deleteAllProductsFromCartAction(cartId))
  }

  async getCartByUser(userId: string): Promise<CartModel>{
    const cart = await firstValueFrom(this.http.get<CartModel>(environment.cartByUserUrl + userId))
    store.dispatch(fetchCartAction(cart))
    return cart
  }


  async getCart(): Promise<CartModel>{
    let cart = store.getState().cartsState.cart
    if(!cart){
       cart = await firstValueFrom(this.http.get<CartModel>(environment.cartsUrl))
    }
     store.dispatch(fetchCartAction(cart))
      return cart
    }

  
   
    
  }
  




