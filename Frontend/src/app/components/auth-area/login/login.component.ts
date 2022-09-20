import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import { CartModel } from 'src/app/models/cart.model';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { CartsService } from 'src/app/services/carts.service';
import { NotifyService } from 'src/app/services/notify.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  public credentials= new CredentialsModel()
  public user: UserModel
  public unsubscribe: Unsubscribe
  public userCart: CartModel
  

  constructor(private authService: AuthService , private notify: NotifyService, private router: Router, private cartService: CartsService) { }

  async ngOnInit(){
    this.user = store.getState().authState.user
    this.unsubscribe = store.subscribe(() => {
      this.user = store.getState().authState.user
      
    })
  }

  public async submit(){
    try{
      await this.authService.login(this.credentials)
      this.notify.success("Welcome!")
      if(this.user.role === 1){
        this.router.navigateByUrl("/admin")
      }
      else{

        this.router.navigateByUrl("/shop")
      }
    }
    catch(err:any){
      this.notify.error(err)
    }
  }

}
