import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

let userRoute: Routes = [ 
  { path: 'wishlist', component: WishlistComponent},
  { path: 'cart', component:WishlistComponent},
  { path: 'profile', component: ProfileComponent }  
]

@NgModule({
  declarations: [
    ProfileComponent,
    WishlistComponent,
    CartComponent
  ],
  imports: [
    RouterModule.forChild(userRoute),
    // i can use shared module
    SharedModule

    // CommonModule,
  ],
  exports:[
    RouterModule
  ]
})
export class UserModule { }
