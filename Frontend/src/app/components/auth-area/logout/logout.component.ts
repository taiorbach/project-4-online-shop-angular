import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-logout',
  template: "",
 
})

export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private notify: NotifyService , private router: Router) { }

  ngOnInit(): void {
    this.authService.logout();
    this.notify.success("You are logged out");
    this.router.navigateByUrl("/home");
}

public logout(){
  try{
     this.authService.logout()
     this.notify.success("You are logged out");
     this.router.navigateByUrl("/home");
     console.log("lgout cart",store.getState().cartsState.cart)
     console.log("lgout cartP",store.getState().cartsState.cartProducts)
  }
  catch(err:any){
    this.notify.error(err)
  }
}

}
