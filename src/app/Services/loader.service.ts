import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

// i make behaviour to make this loader listen to all evevt 
  isloading:BehaviorSubject<boolean>
  constructor() {
    this.isloading=new BehaviorSubject<boolean>(false)
   }
   //only interceptor set in Subject
   hideLoader(){

    this.isloading.next(false)
   }
   showLoader(){

    this.isloading.next(true)
   }
}
