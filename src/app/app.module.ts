import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';



import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TableclientComponent } from './components/tableclient/tableclient.component';

import {
  AngularFireStorage,
  AngularFireStorageModule,
} from "@angular/fire/storage";
import { TableserverComponent } from './components/tableserver/tableserver.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/webshop/footer/footer.component';
import { HeaderComponent } from './components/webshop/header/header.component';
import { CartComponent } from './components/webshop/cart/cart.component';
import { ProductsingleComponent } from './components/webshop/productsingle/productsingle.component';
import { CheckoutComponent } from './components/webshop/checkout/checkout.component';
import { ShopComponent } from './components/webshop/shop/shop.component';
import { DashboardComponent } from './components/webshop/dashboard/dashboard.component';
import { OrdersComponent } from './components/webshop/orders/orders.component';
import { LoginshopComponent } from './components/webshop/loginshop/loginshop.component';
import { SignupComponent } from './components/webshop/signup/signup.component';
import { ForgotPasswordComponent } from './components/webshop/forgot-password/forgot-password.component';
import { HomeshopComponent } from './components/webshop/homeshop/homeshop.component';
import { ManageordersComponent } from './components/manageorders/manageorders.component';




@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    TableclientComponent,
    TableserverComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    HeaderComponent,
    CartComponent,
    ProductsingleComponent,
    CheckoutComponent,
    ShopComponent,
    DashboardComponent,
    OrdersComponent,
    LoginshopComponent,
    SignupComponent,
    ForgotPasswordComponent,
    HomeshopComponent,
    ManageordersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    ReactiveFormsModule,
    SlickCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
