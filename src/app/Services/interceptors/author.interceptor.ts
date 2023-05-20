import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../account.service';

@Injectable()
export class AuthorInterceptor implements HttpInterceptor {

  constructor(private accSrv:AccountService) {}
  
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      // return next.handle(request);
      console.log("oooolllllldddd" ,request)
      let newRequset = request.clone({
        // ADD IN  header [authorization] that is in cookie
         headers : request.headers.set("authorization",`bearer ${this.accSrv.getuser().token}`)
      })
      // console.log("nnnnnewwww",newRequset)
      return next.handle(newRequset);
    }
  }
// }
