import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { ApiResult } from '../Models/ApiResult';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  orignaPath ="http://localhost:5000/" 
  // there is thing that show or not show by using behaviour subject and its dataType [StoredUser]
  // this is subject it initial by the value of local storage 
  StoredUserSub:BehaviorSubject<StoredUser>

// need to make this service that it depend on api or my server
  constructor(private http:HttpClient) { 
    this.StoredUserSub = new BehaviorSubject<StoredUser>(this.getuser())
  }


// this to make a localStorage of user in localhost
  setuser(token:string, name:string){
    let s= {token:token,name:name} as StoredUser;
    localStorage.setItem("storedUser",JSON.stringify(s))
    // [s] is in  [StoredUserSub] and this is type of [BehaviorSubject] to know who is now login
    this.StoredUserSub.next(s)
    console.log(s);
    
  }


// get user from localHost 
  // getuser():StoredUser{
  //   return JSON.parse( localStorage.getItem("storedUser")??"{}") as StoredUser
  // }
  getuser():StoredUser{
    let check = localStorage.getItem("storedUser")
    if(check == null)
      return {token:"",name:""}
    else
      return JSON.parse(check)  as StoredUser
  }

  register(data:User){
    // http://127.0.0.1:5000/user/register come from database 
    // i return to component register.ts to check if this data is ok
    // and this return observable and you can make subscribe to check if true go to next value
    return this.http.post<ApiResult>('http://localhost:5000/user/register',data)

  }
  login(email:string,password:string){
    return this.http.post<ApiResult>('http://localhost:5000/user/login',{email:email,password:password})
  }
  logout(){
    this.setuser("","")
  }

}

interface StoredUser{
  name:string;
  token:string;
  }
