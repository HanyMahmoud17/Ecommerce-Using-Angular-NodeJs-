
// this is an service that this interceptors prove

import { Injectable } from '@angular/core';
import {
  // to make object of interface that i send
  HttpRequest,
  // to say i send request
  HttpHandler,
  //to watch what is event i need to make
  HttpEvent,
  // to get the emplement in this class HttpInterceptor
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../loader.service';
import { AccountService } from '../account.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private LoadSer:LoaderService,private accSrv:AccountService) {}


// [fun => intercept]  when req had happend it call this fun => intercept
// [request]  this is the req that go 
// [next ]  what i need to do of this req 
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.log("old",request);
    
    // open connecion
    this.LoadSer.showLoader()



    // if request is handle as true do the pipe function 
    return next.handle(request).pipe(
      // after res come by true handle this callback fun
      finalize(()=>{
      this.LoadSer.hideLoader()
    }))
  }
}

// step 2  go to app.module.ts
// at providers======> at provider to make this interceptors not genaric 
// step 3 
// make services for loader and for author=> authorization
// step 4
// generate component of loader and set your ui
// step 5
// go to app.html and app module and set loader component
// <app-loader></app-loader>
// step 6
// go to app.ts 
// make boolean to show loader
// step 7
// do [pipe] like subscribe but more function
// [finalize] take callback fun like [next] to make action you need to do 