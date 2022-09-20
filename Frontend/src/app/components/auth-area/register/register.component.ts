import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  public okPassword: string

  public stepOne: boolean = false

  public user = new UserModel();

  constructor(private authService: AuthService, private notify: NotifyService, private router: Router) { }

  public async submit() {
      try {
            await this.authService.register(this.user);
            this.notify.success("You have been registered");
            this.router.navigateByUrl("/home");
          }
          
      
      catch(err: any) {
          this.notify.error(err);
      }
  }

  public async checkIdNumber(){
    try{
       const result = await this.authService.isUserIdFree(this.user.idNumber)
       if(result){
        this.stepOne = true
       }
       else{
         this.notify.error("Id is already in use")
       }
    }
    catch(err:any){
      this.notify.error(err)
    }
  }


}

