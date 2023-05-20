import { Component, Input } from '@angular/core';
import { Iproduct } from 'src/app/Models/Iproduct';
import { ProductService } from 'src/app/Services/product.service';
import { WishlistService } from 'src/app/Services/wishlist.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  @Input() product:Iproduct ={}
  constructor(private wishSrv:WishlistService,private prdSer:ProductService ){
    
  }
  add(prd:Iproduct){}
  
  addToWishlist(product:Iproduct){
    this.wishSrv.add(product).subscribe({
      next:(res)=>{
        if(res.success){
          console.log(res)
          this.wishSrv.setInStorage(res.data as Iproduct[])
        }
      }
    })
  }
  delete(id:string){
    this.prdSer.delete(id).subscribe({
      next:(res)=>{
        // this.wishSrv.setInStorage(res.data as Iproduct[])
        location.reload()
      }
    })
  }
}
