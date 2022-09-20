import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterLink, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import store from '../redux/store';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  public constructor(private notify: NotifyService , private router: Router){}

  canActivate(): boolean {
      if(store.getState().authState.token){
        return true
      }
      this.notify.error("You are not logged in")
      this.router.navigateByUrl("/home")
      return false
  }
}