import { Component } from '@angular/core';
// import { Router } from '@angular/router';
import { AccountService } from 'src/app/Services/account.service';
import { User } from 'src/app/Models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WishlistService } from 'src/app/Services/wishlist.service';
import { Iproduct } from 'src/app/Models/Iproduct';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // loginForm:FormGroup;
  // constructor(private builder:FormBuilder,private accountSrv:AccountService,private router:Router){
  //   // i said to builder to help me to make group of my input amd now i wouid put my controls to you
  //    this.loginForm=this.builder.group({
  //     // if i need to edit from i put values in this empty string
  //     email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
  //     password: ['', [Validators.required, Validators.minLength(8)]]
  
  //    })
  //   }
  // // constructor(private accountSrv:AccountService,private router:Router){

  // // }
  // loginuser(){
  //   // last one
  //   // this.accountSrv.login(this.loginForm.value as User).subscribe({
  //   this.accountSrv.login(this.loginForm.controls["email"].value,this.loginForm.controls["password"].value).subscribe({
  //     next:(response)=>{
  //       console.log(response.data);
  //       // i can make check
  //       if(response.success){
  //         // if true 
  //         this.accountSrv.setuser(response.data.token,response.data.user.name)

  //          // go to home page
  //          this.router.navigateByUrl('/home')
  //         // console.log(response.message);
          
  //         alert(response.message)
  //       }else{
  //           alert(response.message)
  //       }
        
  //     }
  //   })
  // }





 form: FormGroup;
  passType: string = "password";
  // this is return pass of guard 
  returnedUrl = "/home"
  constructor(private builder: FormBuilder, 
    private accountSrv: AccountService,
    private router:Router,
    private activateRoute:ActivatedRoute,
    private wishSrv:WishlistService) {
    this.form = this.builder.group({
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })

    // this of guard of author that to make url dynamic
    this.activateRoute.params.subscribe({
      next:(prams)=>{
      // this url is dynamic 
        this.returnedUrl = prams["returnUrl"]
        console.log(this.returnedUrl)
      }
      
    })
  }
  change() {
    this.passType = (this.passType == "password") ? 'text' : 'password'
  }
  send() {
    if (this.form.valid) {
      console.log(this.form.value)
      this.accountSrv.login(this.form.controls["email"].value,this.form.controls["password"].value)
        .subscribe({
          next: (reponse) => {
            console.log(reponse)

            if(reponse.success){
              // if login is sucess the backend return token and name of user
              // so after success login the fun [setuser] take token and name and set in local storage
              this.accountSrv.setuser(reponse.data.token,reponse.data.user.name)
              // ths code was in washlist.ts i take it here to add data if user make login in my website 
              this.wishSrv.getall().subscribe(
                (res)=>{
                  this.wishSrv.setInStorage(res.data as Iproduct[])
                }
              )
              this.router.navigateByUrl(this.returnedUrl)
            }else{
              alert(reponse.message)
            }
          }
        })
    }}

}
