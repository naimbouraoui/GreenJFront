import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstant } from '../globalcst/GlobalConstants';





@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 
  signupForm! : FormGroup;
responseMessage:any;
  constructor(
    private formBuilder:FormBuilder,
    private ngxService :NgxUiLoaderService,
    private userService :UserService,
    private snack:MatSnackBar,
    private http:HttpClient) {
  
  
  }

  ngOnInit(): void {    this.signupForm = this.formBuilder.group({
    firstname: [null,[ Validators.required,Validators.pattern(GlobalConstant.nameRegex)]],
    lastname: [null,[ Validators.required,Validators.pattern(GlobalConstant.nameRegex)]],
    email: [null,[ Validators.required,Validators.pattern(GlobalConstant.emailRegex)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    username: ['', Validators.required]
  });
  }

  handleSubmit(){
    this.ngxService.start();
    var fromData =this.signupForm.value;
    var data ={
      username: fromData.username,
      firstname:fromData.firstname,
      lastname :fromData.lastname,
      email : fromData.email,
      password :fromData.password  
    }
    this.userService.signup(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.responseMessage=response?.message;
      Swal.fire ('success','User is registred','success')
      this.snack.open(this.responseMessage, "", {
        duration: 3000
      });
    },(error:any)=>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage=error.error?.message;
      }else{
        this.responseMessage =GlobalConstant.genericError;
      }
      this.snack.open(this.responseMessage,GlobalConstant.error)
      }
    
    )
  }
 
}

