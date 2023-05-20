import { Component } from '@angular/core';
// FormGroup is a type of reactive form that i use to design my form
// FormBuilder::this come from form built in to make group of form input
// validator:: this is enum to make array of cotrols of input of form
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { AccountService } from 'src/app/Services/account.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
// i have an model to go and back from place to other using this package
export class RegisterComponent {
  // دي الحاجة الل هشاور بيها ع my html input
  form:FormGroup;
  constructor(private builder:FormBuilder,private accountSrv:AccountService,private router:Router){
  // i said to builder to help me to make group of my input amd now i wouid put my controls to you
   this.form=this.builder.group({
    // if i need to edit from i put values in this empty string
    name:['',[Validators.required,Validators.minLength(3)]],
    phoneNumber: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(15)]],
    email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
    password: ['', [Validators.required, Validators.minLength(8)]],

   })
  }
  send(){
    if (this.form.valid) {
    // return object of values
    // if(this.form.valid){
    //    console.log(this.form.value);
    // }

// here it convert frm object of form to a User style
// here it send data as user to account.servicre.ts to be user every eher of application
// here after account.service.ts post data he return it to me to check if true or not this check of data to database
// by using subscribe and by using next 
    this.accountSrv.register(this.form.value as User).subscribe({
      // this response is object from database [ message: "Error : you should insert valid values",status: 400,data: req.body, success: false,]
      next:(response)=>{

        // console.log(response.data);
        // i can make check
        if(response.success){
          //  go to login page
          //  this.router.navigateByUrl('/login')
           this.router.navigate(['/login','/home'])
        }else{
            alert(response.message)
        }
        
      }

    })
  }
  }

  // for password eyes
  passType="password";
  change(){
      this.passType=(this.passType=="password")?'text':"password"
  }
}
