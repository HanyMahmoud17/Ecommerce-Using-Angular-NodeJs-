import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { ReactiveFormsModule } from '@angular/forms';
import{ HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
// routing
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
// import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { ProductsComponent } from './Components/products/products.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { DetailsComponent } from './Components/details/details.component';

// import { AddProductComponent } from './Components/addProduct/addProduct.component';
import { EditProductComponent } from './vendor/edit-product/edit-product.component';
import { AuthorInterceptor } from './Services/interceptors/author.interceptor';
import { LoaderInterceptor } from './Services/interceptors/loader.interceptor';
import { LoaderComponent } from './Components/loader/loader.component';
import { SharedModule } from './shared/shared.module';
// import { CartComponent } from './usere/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProductsComponent,
    AboutUsComponent,
    ContactUsComponent,
    NotFoundComponent,
    DetailsComponent,
    // AddProductComponent,
    // EditProductComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // use shared module
    SharedModule
  ],
  providers: [
    // any req go move on this two interceptors
    // ADD TO list already exist my class and this object be multible to make all use
    {provide:HTTP_INTERCEPTORS,useClass:AuthorInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LoaderInterceptor,multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
