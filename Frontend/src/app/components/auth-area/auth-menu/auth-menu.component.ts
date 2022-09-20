import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.css']
})
export class AuthMenuComponent implements OnInit {

  public user: UserModel
  private unsubscribe: Unsubscribe

  constructor(private authService: AuthService, private notify: NotifyService, private router: Router) { }

  ngOnInit(): void {
    this.user = store.getState().authState.user
    this.unsubscribe = store.subscribe(() => {
      this.user = store.getState().authState.user
    })
  }

  OnDestroy(): void {
    this.unsubscribe()
  }

  public logout(){
    try{
       this.authService.logout()
       this.notify.success("You are logged out");
       this.router.navigateByUrl("/home");
    }
    catch(err:any){
      this.notify.error(err)
    }
  }

  

}
