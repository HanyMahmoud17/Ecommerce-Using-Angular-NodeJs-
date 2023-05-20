import { Component } from '@angular/core';
import { Iproduct } from 'src/app/Models/Iproduct';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
list:Iproduct[]
constructor(private prdSrv :ProductService){
this.list=[]
this.prdSrv.getAll().subscribe({
  next:(response)=>{
    // i put this all product in  variable to loop on it 
    let temp=response.data as Iproduct[]
    // i make loop of temp=list to change id to _id in database because i didn't need to make change all of id to _id with my hand
  // temp.forEach(item=>{
  //   // this to get specific item of list
  //   item.id=item._id;
  // })    
  this.list=temp
    // this.list=response.data as Iproduct[]
  }
})
// delete(id: number) {
//   this.prdSrv.delete(id).subscribe({
//     next: (res) => {
//       // Remove the deleted product from the list
//       // this.list = this.list.filter(p => p.id !== id);
//     }
//   });
// }
}
}
