import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import store from '../redux/store';
import { loginAction, logoutAction, registerAction } from '../redux/auth-state';
import { CredentialsModel } from '../models/credentials.model';
import { deleteAllProductsFromCartAction, fetchAllCartProductAction, fetchCartAction } from '../redux/carts-state';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public async register(user: UserModel): Promise<void>{
    const token = await firstValueFrom(this.http.post<string>(environment.registerUrl, user))
    store.dispatch(registerAction(token))
  }

  public async login(credentials: CredentialsModel): Promise<void>{
    const token = await firstValueFrom(this.http.post<string>(environment.loginUrl, credentials))
    store.dispatch(loginAction(token))
  }

  public logout(): void{
    store.dispatch(fetchCartAction(null))
    store.dispatch(fetchAllCartProductAction([]))
    store.dispatch(logoutAction())
  }

  public async isUserIdFree(idNumber: number): Promise<boolean>{
      const isIdNumTaken = await firstValueFrom(this.http.get<boolean>(environment.usersUrl + idNumber))
      if(!isIdNumTaken){
        return true
      }
      return false
     
  }
 }
