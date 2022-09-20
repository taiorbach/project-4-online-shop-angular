import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { AuthMenuComponent } from './components/auth-area/auth-menu/auth-menu.component';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HomeComponent } from './components/home-area/home/home.component';
import { JwtInterceptor } from './services/jwt.interceptors';
import { AboutComponent } from './components/home-area/about/about.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { ProductListComponent } from './components/products-area/product-list/product-list.component';
import { ProductCardComponent } from './components/products-area/product-card/product-card.component';
import { SiteInfoComponent } from './components/home-area/site-info/site-info.component';
import { ProductDialogComponent } from './components/products-area/product-dialog/product-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { ShopComponent } from './components/shop-area/shop/shop.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { CartComponent } from './components/products-area/cart/cart.component';
import { MatListModule } from '@angular/material/list';
import { AdminPageComponent } from './components/admin-area/admin-page/admin-page.component';
import { AddProductComponent } from './components/admin-area/add-product/add-product.component';
import { UpdateProductComponent } from './components/admin-area/update-product/update-product.component';
import { OrderComponent } from './components/products-area/order/order.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { StoreModule } from '@ngrx/store';
import { HighlightSearchPipe } from '../app/pipes/highlight.pipe';
import { OrderDialogComponent } from './components/products-area/order-dialog/order-dialog.component';




@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    AuthMenuComponent,
    LayoutComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    RegisterComponent,
    ProductListComponent,
    ProductCardComponent,
    SiteInfoComponent,
    ProductDialogComponent,
    ShopComponent,
    CartComponent,
    AdminPageComponent,
    AddProductComponent,
    UpdateProductComponent,
    OrderComponent,
    HighlightSearchPipe,
    OrderDialogComponent,
 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatSelectModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDatepickerModule,
    StoreModule.forRoot({}, {}),
    
    
    
  ],
  providers: [{
    useClass: JwtInterceptor,
        provide: HTTP_INTERCEPTORS,
        multi: true
}],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
