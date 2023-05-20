import { Component } from '@angular/core';
import { LoaderService } from './Services/loader.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ecommerce';
  // for interseptor loader 
  isloading:BehaviorSubject<boolean>
  constructor(private loadSrv:LoaderService){
    // i can use subscribe to listen but i can use this and in <app-loader> i make async 
    this.isloading=this.loadSrv.isloading

  }
}
