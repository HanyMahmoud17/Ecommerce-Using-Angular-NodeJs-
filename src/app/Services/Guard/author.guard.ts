import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../account.service';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthorGuard implements CanActivate {
  constructor(private accSrv:AccountService,private route:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean{
      let user=this.accSrv.getuser()
      if(user.token==""|| user.token==undefined ){
        // at state it is my last url
        console.log(route,state);
        alert('assign first')
        // i use  navigate to send path dynamic
        this.route.navigate(['/login',state.url])
         return false;
        }else{
          return true;
        }
  }
  
}



// go to app.routing and put guard to any path you need to show or hide
