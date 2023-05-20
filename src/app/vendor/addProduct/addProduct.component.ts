import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-addProduct',
  templateUrl: './addProduct.component.html',
  styleUrls: ['./addProduct.component.css']
})
export class AddProductComponent implements OnInit {
  // for my form
form:FormGroup;
// form image to upload as a file
data:FormData;

  constructor(private builder:FormBuilder,private prdSrv:ProductService,private router:Router) {

    //set initial object of this data 
    this.data=new FormData();

    this.form=this.builder.group({
      name:['hany',Validators.required],
      description:['begin to learn angular ',Validators.required],
      quantity:['',Validators.required],
      price:['0',Validators.required],
      // last one we make
      // colors:this.builder.array([
      //   this.builder.control(''),
      //   this.builder.control(''),

      // ]),
      //      controls=> array =>array of controls
      colors: this.builder.array([['#000000'],]),
      categoryID:['1',],
      categoryName:['1',],
      // imgURL:

    })
   }
    // array
get listColors(){
  return this.form.controls["colors"] as FormArray;
}
add(){
  this.listColors.push(new FormControl())
}
remove(index:number){
this.listColors.removeAt(index);
}
upload(data:any){
// here i need to add the path of this image by key of backend  and object data[0] 
// data[0] this is to tell him that i add one image
this.data.append('imgURL',data[0])
}

send(){
  // i need to loop by key[name,imgurl,description] at form and send data
  for(let key in this.form.controls){
    // he go and get name and its value for all input in form
    this.data.append(key,this.form.controls[key].value)
  }
  // console.log(this.data.get('imgURL'));
  // console.log(this.data.get('name'));
  // console.log(this.data.get('price'));
  this.prdSrv.add(this.data).subscribe({
    next:(res)=>{
      if(res.success){
        console.log(res.data);
        this.router.navigateByUrl('./home')
        
      }else{
        alert(res.message)
      }
    }
  })
   } 
   



  ngOnInit() {
  }

}
