import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/admin-area/add-product/add-product.component';
import { AdminPageComponent } from './components/admin-area/admin-page/admin-page.component';
import { UpdateProductComponent } from './components/admin-area/update-product/update-product.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { OrderComponent } from './components/products-area/order/order.component';
import { ProductListComponent } from './components/products-area/product-list/product-list.component';
import { ShopComponent } from './components/shop-area/shop/shop.component';
import { AdminGuard } from './services/admin.guard';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [  
  { path: "register", component: RegisterComponent },
  { path: "logout", component: LogoutComponent },
  { path: "admin", component: AdminPageComponent, canActivate: [AdminGuard]  },
  { path: "admin/new", component: AddProductComponent, canActivate: [AdminGuard]  },
  { path: "admin/edit/:id", component: UpdateProductComponent, canActivate: [AdminGuard]  },
  { path: "home", component: HomeComponent },
  { path: "shop", component: ShopComponent, canActivate: [AuthGuard ] },
  { path: "order" , component: OrderComponent, canActivate: [AuthGuard ]},

  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", redirectTo: "/home", pathMatch: "full" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
