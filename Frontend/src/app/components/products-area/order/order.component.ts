import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartProductModel } from 'src/app/models/cart-product.model';
import { CartModel } from 'src/app/models/cart.model';
import { OrderModel } from 'src/app/models/order.model';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { CartsService } from 'src/app/services/carts.service';
import { NotifyService } from 'src/app/services/notify.service';
import { OrdersService } from 'src/app/services/orders.service';
import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";
import autoTable from 'jspdf-autotable';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';




@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [OrdersService]
  
})
export class OrderComponent implements OnInit {

  public order = new OrderModel()
  public cart: CartModel
  public cartProducts: CartProductModel[]
  public user: UserModel
  public orderDone: boolean = false
  public currentDate = new Date()
  public searchString: string

  
  


  constructor(private cartService: CartsService , private orderService: OrdersService, private notify: NotifyService, private router: Router, public dialog: MatDialog) { }

 async ngOnInit(){
  try{
    this.user = store.getState().authState.user
    this.cart = await this.cartService.getCart()
    this.cartProducts = await this.cartService.getAllProductsByCart(this.cart._id)

    this.order.street = this.user.street
    this.order.city = this.user.city
    this.order.cartId = this.cart._id
    this.order.userId = this.user._id
    this.order.totalPrice = this.getTotalPrice(this.cartProducts)
    
  }
  catch(err:any){
    this.notify.error(err)
  }
  }

  public getTotalPrice(cartProducts: CartProductModel[]): number{
    return cartProducts?.reduce((accu, curVal) => accu + curVal.totalPrice, 0)
  }


public async orderNow(){
  try{
    this.order.date = new Date()
    this.order.isDone = true
    const currentOrder = await this.orderService.addOrder(this.order)
    this.notify.success("Your order has been accepted")

    let dialogRef = this.dialog.open(OrderDialogComponent)
    dialogRef.afterClosed().subscribe((reuslt) => {
      this.printInvoice()
      this.backToShop()
      
    })
  }
  catch(err:any){
    this.notify.error(err)
  }
 
  
}



public async backToShop(){
  if(this.order.isDone === true){
    this.router.navigateByUrl("/shop")
    await this.cartService.clearProdcutsFromCart(this.cart._id)
  }
  else{
    this.router.navigateByUrl("/shop")
  }
 
}

 public printInvoice(){
  
  const doc = new jsPDF()
  autoTable(doc, {
    body: [
      [
        {
          content: "Tai's Market",
          styles: {
            halign: "left",
            fontSize: 20,
            textColor: "black"
          }
        },
        {
          content: "Invoice",
          styles: {
            halign: "right",
            fontSize: 20,
            textColor: "black"
          }
        }
      ],

    ],
    theme: "plain",
    styles: {
      fillColor: "#3366ff"
    }
  })

  autoTable(doc, {
    body: [
      [
        {
          content: "#INV000"
          +'\nDate:'+ new Date(this.order.date).toLocaleDateString()
          +'\nInvoice number: ###' ,
          styles: {
            halign: "left",
          }
        }
      ],

    ],
    theme: "plain",
  })

  autoTable(doc, {
    body: [
      [
        {
          content: "Billed to:"
          +'\n'+this.user.firstName + " " + this.user.lastName
          +'\n'+this.user.city + "," + this.user.street,
          styles: {
            halign: "left",
          }
        },
        {
          content: "Delivery address:"
          +'\n'+this.order.city + " " + this.order.street,
          styles: {
            halign: "left",
          }
        },
     
      ],

    ],
    theme: "plain",
  })

 


  autoTable(doc, {
    head: [["Products", "Price", "Quantity", "Total Price"]],
    body: [
        ...this.cartProducts.map(c => ([c.name, '$'+c.price, c.quantity, '$'+(c.price*c.quantity).toFixed(2)]))


        
    ],

    theme: 'plain'

  })

  autoTable(doc, {
    body: [
      [
        {
          content: "Total Price",
          styles: {
            halign: 'right',
            fontSize: 14,
          }
        }
      ],
      [
        {
          content: this.order.totalPrice + "$",
          styles: {
            halign: 'right',
            fontSize: 14,
            textColor: '#3366ff'
          }
        }
      ],
 
      ],

    theme: 'plain'

  })

 





  return doc.save("Invoice")
}


 

}



