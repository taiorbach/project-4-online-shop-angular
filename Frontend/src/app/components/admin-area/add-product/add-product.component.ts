import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public product = new ProductModel()

  public products: ProductModel[]
  public categories : CategoryModel[] = []

  @ViewChild("imageBox")
  public imageBoxRef: ElementRef<HTMLInputElement>

  constructor(private productsService: ProductsService, private router: Router, private notify: NotifyService) { }

  async ngOnInit() {
    try{
      this.categories = await this.productsService.getAllCategories()
      this.products = await this.productsService.getAllProducts()
    }
    catch(err:any){
      this.notify.error(err)
    }
  }


  async add(){
    try{
      
      this.product.image = this.imageBoxRef.nativeElement.files[0]
      const addedProduct = await this.productsService.addProduct(this.product)
      await this.productsService.getAllProducts()
      this.notify.success("Product has been added")
      
      
    }
    catch(err:any){
      this.notify.error(err)
      console.log(err)
    }
  }

}
