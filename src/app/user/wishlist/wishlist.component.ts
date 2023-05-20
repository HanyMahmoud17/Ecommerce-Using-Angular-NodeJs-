import { Component } from '@angular/core';
import { Iproduct } from 'src/app/Models/Iproduct';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {

  list:Iproduct[]=[]
  constructor(private wishSer:WishlistService){
    this.wishSer.wishlistSubject.subscribe({
      next:(val)=>{
        this.list=val;
      }
    })
  }

  remove(id:string){
    this.wishSer.remove(id).subscribe({
      next:(res)=>{
        this.wishSer.setInStorage(res.data as Iproduct[])
        console.log(res);
        
        // console.log(res.data);
        
      }
    })
  }
  empty(){
    this.wishSer.empty().subscribe({
      next:(res)=>{
        this.wishSer.setInStorage(res.data as Iproduct[])
      }
    })
  }
  
}
