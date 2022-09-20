import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  public products: ProductModel[]
  public opened = false

  constructor( private productsService: ProductsService , private notify: NotifyService) { }

  async ngOnInit(): Promise<void> {
        this.products = await this.productsService.getAllProducts()
    console.log(this.products)
  }

  

}
 