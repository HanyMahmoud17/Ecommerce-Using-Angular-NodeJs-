import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddProductComponent } from './addProduct/addProduct.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

let VendorRoutes: Routes = [ 
  { path: '', component: DashboardComponent },
  { path: 'addProduct/:returnUrl', component:AddProductComponent},
  { path: 'editPoduct/:id', component: EditProductComponent}  
]

@NgModule({
  declarations: [
    DashboardComponent,
    AddProductComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(VendorRoutes),
    // i use shared module
    SharedModule
    
    // ReactiveFormsModule
  ],
  exports:[
    // send this to app.module
    RouterModule
  ]
})
export class VendorModule { }
