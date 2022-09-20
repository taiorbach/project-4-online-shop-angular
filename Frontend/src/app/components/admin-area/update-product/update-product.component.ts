import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  public product: ProductModel

  public productForm: FormGroup
  public nameInput: FormControl
  public priceInput: FormControl
  public imageInput: FormControl

  @ViewChild("imageBox")
  public imageBoxRef: ElementRef<HTMLInputElement>;

  constructor(private activatedRoute: ActivatedRoute, private productsService: ProductsService, private router: Router, private notify: NotifyService) { }

  async ngOnInit(){
    try{
      const _id = this.activatedRoute.snapshot.params["id"]
      console.log(_id)
      this.product = await this.productsService.getOneProduct(_id)

      this.nameInput = new FormControl(this.product.name, [Validators.required, Validators.minLength(3), Validators.maxLength(30)])
      this.priceInput = new FormControl(this.product.price, [Validators.required, Validators.min(0.01), Validators.max(1000)])
      this.imageInput = new FormControl()
      this.productForm = new FormGroup({
        nameBox: this.nameInput,
        priceBox: this.priceInput,
        imageBox: this.imageInput
      })
    }
      catch(err:any){
        this.notify.error(err)
      }
   
  }

  public async update(){
    try{
     this.product.name = this.nameInput.value
     this.product.price = this.priceInput.value
     this.product.image = this.imageBoxRef.nativeElement.files[0]
     await this.productsService.updateProduct(this.product)
     this.notify.success("Product has been updated")
     this.router.navigateByUrl("/admin")
    }
      catch(err:any){
        this.notify.error(err)
      }
  }

}
