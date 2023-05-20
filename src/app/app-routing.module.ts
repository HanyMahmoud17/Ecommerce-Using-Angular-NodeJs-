import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
// import { WishlistComponent } from './Components/wishlist/wishlist.component';
// import { AddProductComponent } from './Components/addProduct/addProduct.component';
import { ProductsComponent } from './Components/products/products.component';
import { EditProductComponent } from './vendor/edit-product/edit-product.component';
import { AuthorGuard } from './Services/Guard/author.guard';

const routes: Routes = [
  {path:'',redirectTo:"about",pathMatch:"full"},
  {path:'home',component:HomeComponent,title:"home-Home Page"},
  {path:"about",component:AboutUsComponent,title:""},
  {path:"contact",component:ContactUsComponent},
  {path:"login/:returnUrl",component:LoginComponent},//canActivate this to give access to who can go to this page
  {path:"register",component:RegisterComponent},
  // any one go to wishlist must pass at guard author == authorization
  // {path:"wishlist",component:WishlistComponent,canActivate:[AuthorGuard]},
  // {path:"addProduct/:returnUrl",component:AddProductComponent,canActivate:[AuthorGuard]},
  {path:"product/:id",component:ProductsComponent},
  // {path:"edit-product/:id",component:EditProductComponent,canActivate:[AuthorGuard]},
  {
    // this to make lazy-load what is word to get  this route to work
    path: 'user', 
//key to call this path           ths children come from     this is module to make initialization for this model
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate:[AuthorGuard],
  },
  {
    path: 'vendor', 
    loadChildren: () => import('./vendor/vendor.module').then(m => m.VendorModule),
    // must be guard for vendor module
    canActivate: [AuthorGuard]
  },
  {path:"**",component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
