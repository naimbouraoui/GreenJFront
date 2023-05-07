import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router :Router,
    private userService :UserService,
    private userAuthservice :UserAuthService ) { }

  ngOnInit(): void {
  }
  login(loginForm:NgForm){
    this.userService.login(loginForm.value).subscribe(
      (response:any)=>{
      this.userAuthservice.setRoles(response.userDetails.user.roles);
        this.userAuthservice.setToken(response.jwt)       
      const role =  response.userDetails.user.roles[0].name;
        if (role === 'USER_ROLE'){
          this.router.navigate(['/blog']);
          console.log(response);
        }else {
          this.router.navigate(['/page1']);
        }
      },
      (error:any)=>{
        console.log(error);
      }

    )
  }

}
