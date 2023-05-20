import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Iproduct } from 'src/app/Models/Iproduct';
import { AccountService } from 'src/app/Services/account.service';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // i make count for number of wishlist items
  count:number=0
  islogged:boolean=false;
  UserName:String=""
constructor(private wishSrv:WishlistService,private accSr:AccountService,private route:Router){
  // i here listen to wishlist by behaviour subject to kisten for every change that happen
  // then ggggggggggooooo to login to add an data about this user as wishlist
  this.wishSrv.wishlistSubject.subscribe((val)=>{
    this.count=val.length
  })
  // this to show all wish list products that
  this.wishSrv.getall().subscribe(
    (res)=>{
      this.wishSrv.setInStorage(res.data as Iproduct[])
    }
  )
  
  this.accSr.StoredUserSub.subscribe({
    next:(val)=>{
      // if string is empty return false else return true
      this.islogged=val.token==""?false:true
      this.UserName=val.name
    }
  })
}
logout(){
  this.accSr.logout();
  this.route.navigate(['/login','/home'])
  this.wishSrv.setInStorage([])
}

isActive = false;

addClass() {
  this.isActive = true;
}

}
