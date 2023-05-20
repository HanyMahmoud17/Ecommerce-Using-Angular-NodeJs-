import { Component } from '@angular/core';
// import { ProductsComponent } from '../products/products.component';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
 export class DetailsComponent {
//   constructor(private route:ActivatedRoute,private prdSrv:ProductsComponent){
//     this.route.params.subscribe(
//       (parm)=>{
//         this.prdSrv.getproductById['id']).subscribe({
//           next:(res)=>{
//             console.log(res.data);
            
//           }
//         })
//       }
//     )
//   }

  constructor(private route:ActivatedRoute,private prdSrv:ProductService){
    this.route.params.subscribe(
      (pram)=>{
  
      this.prdSrv.getproductById(pram["id"]).subscribe({
        next:(res)=>{
          console.log(res.data)
        }
      })
    })
  }
  }