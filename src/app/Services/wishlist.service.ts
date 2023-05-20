import { Injectable } from '@angular/core';
import { ApiResult } from '../Models/ApiResult';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Iproduct } from '../Models/Iproduct';
import { AccountService } from './account.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  // // userOptions={
  // //   headers:new HttpHeaders().set("authorization",`bearer ${this.accSrv.getuser().token}`)
  // // }
  
  // constructor(private http:HttpClient,private accSrv:AccountService) { }
  // add(prd:Iproduct){
  //   return this.http.post<ApiResult>("http://localhost:5000/user/wishlist/add",prd,this.userOptions)
  // }

  ///////////////////////new

  wishlistSubject:BehaviorSubject<Iproduct[]>;
  constructor(private http:HttpClient){
    this.wishlistSubject=new BehaviorSubject<Iproduct[]>([])

  }
  // not understand this
  // for learn i tell user when he put at heart add product and after click again add new product 
  // and i use this fun to remove and empty the wishlist
  setInStorage(val:Iproduct[]){
    this.wishlistSubject.next(val);
  }

  getall(){
    return this.http.get<ApiResult>("http://localhost:5000/user/wishlist")
  }
  // this is fun that add product to wishlist and this fun reflect to button in product card
  // then go to backend 
  add(prd:Iproduct){
    return this.http.post<ApiResult>("http://localhost:5000/user/wishlist/add",prd)
  }
  
  remove(id:any){
    return this.http.delete<ApiResult>("http://localhost:5000/user/wishlist/remove/"+id)
  }
  empty(){
    return this.http.delete<ApiResult>("http://localhost:5000/user/wishlist/empty")
  }


}
