import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators, FormArray } from '@angular/forms';
import { Iproduct } from 'src/app/Models/Iproduct';
import { ProductService } from 'src/app/Services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {

  data:FormData
  form!: FormGroup;
  oldProduct:Iproduct;
  // no need 
  id:string=""
  isLoading=false;
  constructor(
    private router:Router,
    private builder: FormBuilder,
    private prdSrv:ProductService,
    private activRoute :ActivatedRoute) {
      // make initial of data
    this.data = new FormData()
    // make last product {}
    this.oldProduct = {}
  }
  ngOnInit() {
    this.activRoute.params.subscribe({
      next:(prams)=>{
         // no need 
        this.id = prams["id"]
        // subscribe take object to backend and come with res
        this.prdSrv.getproductById(prams["id"]).subscribe({
          next:(res)=>{
            this.oldProduct = res.data as Iproduct;
            this.buildForm()
            this.isLoading = true
          }
        })
      }
    })
  }
  get listColors() {
    return this.form.controls["colors"] as FormArray
  }
  add() {
    this.listColors.push(new FormControl())
  
    
  }
  remove(index: number) {
    this.listColors.removeAt(index)
  }
  upload(data:any){
    this.data.append('imgURL',data[0])
  }
  buildForm(){
    ////to appand Coloer ayyay
    let list = this.builder.array([])
    console.log(this.oldProduct);
    
    this.oldProduct.colors = String(this.oldProduct.colors![0]).split(",")
    for (const item of this.oldProduct.colors!) {
      list.push(new FormControl(item))
    }
    this.form = this.builder.group({
      name: [this.oldProduct.name, [Validators.required]],
      description: [this.oldProduct.description, [Validators.required]],
      quantity: [this.oldProduct.quantity, [Validators.required]],
      price: [this.oldProduct.price, [Validators.required]],
      colors: list ,
      categoryID: [this.oldProduct.categoryID],
    })
  }
  send() {
    console.log(this.form.value)
    console.log(this.id)
    for (const key in this.form.controls) {
      this.data.append(key,this.form.controls[key].value)
    }
    this.prdSrv.edit(this.data,this.id).subscribe({
      next:(res)=>{
        if(res.success){
          //goo to home
          this.router.navigateByUrl('/home')
        }
        else{
          alert(res.message)
        }
      }
    })

  }

}
