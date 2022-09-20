import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryModel } from '../models/category.model';
import { ProductModel } from '../models/product.model';
import { fetchCategoriesAction } from '../redux/categories-state';
import { addProductsAction, deleteProductsAction, fetchProductsAction, updateProductsAction } from '../redux/products-state';
import store from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  public async getAllProducts(): Promise<ProductModel[]>{
    if(store.getState().productsState.products.length === 0){
     let products = await firstValueFrom(this.http.get<ProductModel[]>(environment.productsUrl))
      store.dispatch(fetchProductsAction(products))
    }
     return store.getState().productsState.products
  }

  public async getOneProduct(id: string): Promise<ProductModel>{
    let products = await this.getAllProducts()
    const product = products.find(p => p._id === id)
    return product
  }


  public async getAllCategories():Promise<CategoryModel[]> {
    if (store.getState().categoriesState.categories.length === 0) {
      const categories = await firstValueFrom(this.http.get<CategoryModel[]>(environment.categoriesUrl))
      store.dispatch(fetchCategoriesAction(categories))
    }
    return store.getState().categoriesState.categories
  }

  public async getProductByCategory(categoryId: string): Promise<ProductModel[]>{
    const products = await firstValueFrom(this.http.get<ProductModel[]>(environment.productsByCategoryUrl + categoryId))
    return products
  }

  public async addProduct(product: ProductModel): Promise<ProductModel>{
    const formData = new FormData()
    formData.append("name", product.name)
    formData.append("price", product.price.toString())
    formData.append("categoryId", product.categoryId)
    formData.append("image", product.image)

    const addedProduct = await firstValueFrom(this.http.post<ProductModel>(environment.productsUrl, formData))

    store.dispatch(addProductsAction(addedProduct))
    return addedProduct
  }

  public async updateProduct(product: ProductModel): Promise<ProductModel>{
    const formData = new FormData()
    formData.append("_id", product._id)
    formData.append("name", product.name)
    formData.append("price", product.price.toLocaleString())
    formData.append("image", product.image)

    const updatedProduct = await firstValueFrom(this.http.put<ProductModel>(environment.productsUrl + product._id, formData))
     store.dispatch(updateProductsAction(updatedProduct))

     return updatedProduct
  }

  public async deleteProduct(_id: string): Promise<void>{
    await firstValueFrom(this.http.delete(environment.productsUrl + _id))
    store.dispatch(deleteProductsAction(_id))
  }

  public async countProducts(): Promise<number>{
    const count = await firstValueFrom(this.http.get<number>(environment.productCountUrl))
    return count
  }





}
