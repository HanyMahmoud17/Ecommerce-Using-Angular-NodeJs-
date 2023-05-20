import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResult } from '../Models/ApiResult';
import { Iproduct } from '../Models/Iproduct';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // here i need to get all of my product from api so 
  // i use httpservice in constructor
  constructor(private http:HttpClient){

  }
  realPath="http://localhost:5000/"

// show all  product in home component
  getAll(){
   return this.http.get<ApiResult>('http://localhost:5000/product')
  }
  // get product by id
  getproductById(id:number){
    return this.http.get<ApiResult>(this.realPath+'product/'+id)
  }
  // category by id
  getByCategoryID(id:number){
    return this.http.get<ApiResult>(this.realPath+"product/category/"+id);
  }
  // delete product
  delete(id:string){
    return this.http.delete<ApiResult>(this.realPath+'product/delete/'+id)
  }
// add product
  add(data:FormData){
    return this.http.post<ApiResult>(this.realPath+'product/add',data)
  }
  edit(data:FormData,id:string){
    return this.http.put<ApiResult>(this.realPath+'product/edit/'+id,data)
  }

}
