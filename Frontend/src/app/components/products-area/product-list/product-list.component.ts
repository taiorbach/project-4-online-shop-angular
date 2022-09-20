import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Unsubscribe } from 'redux';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import store from 'src/app/redux/store';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products : ProductModel[]
  categories: CategoryModel[]
  searchText: string = ""
  private unsubscribe: Unsubscribe

  constructor(private productsService: ProductsService, private notify: NotifyService) { }

  async ngOnInit(){

   try{
      this.categories = await this.productsService.getAllCategories()
      this.products = await this.productsService.getAllProducts()
      this.unsubscribe = store.subscribe(() => {
        this.products = store.getState().productsState.products
        this.categories = store.getState().categoriesState.categories
      })
   }
   catch(err:any){
    this.notify.error(err)
   }
     
  }

  async getProductsByCategory(categoryId: string){
    try{
      this.products = await this.productsService.getProductByCategory(categoryId)
   }
   catch(err:any){
    this.notify.error(err)
   }
  }

  async getAllProducts(){
    try{
    this.products = await this.productsService.getAllProducts()
   }
   catch(err:any){
    this.notify.error(err)
   }
  }


  async search(searchText: string){
    this.products = await this.productsService.getAllProducts()
    this.products = this.products.filter(p => {return p.name.toLowerCase().includes(searchText.toLowerCase())})
  }

ngOnDestroy(){
  this.unsubscribe()
}
 


}
