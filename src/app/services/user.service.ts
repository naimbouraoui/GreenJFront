import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UserAuthService } from './user-auth.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Type } from '@angular/compiler';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:9091/api/UserController'
requestHeader=new HttpHeaders(
  {"No-Auth":"True"}
);
  constructor(private http:HttpClient,private userAuthService :UserAuthService) { }

  //signUp
  signup(data :any){
    return this.http.post(this.baseUrl+"/register",data,{headers:new HttpHeaders().set('Content-Type','application/json')})
  }
  //forget password
  /*forgetPassword(data :any){
    return this.http.post(this.baseUrl+"/reset",data,{headers:new HttpHeaders().set('Content-Type','application/json')})
  }
  //login */
  public login(loginData:any){

    return this.http.post(this.baseUrl+`/authenticate`,loginData,{headers :this.requestHeader});
  }
  public roleMatch(allowedRoles :any): boolean {
    let isMatch = false;
    const userRoles: any[] = this.userAuthService.getRoles(); // use an array type
    if (userRoles != null && userRoles.length > 0) { // add a length check
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].name === allowedRoles[j]) { // fix the syntax error here
            isMatch = true;
            return isMatch;
          }
        }
      }
    }
    return isMatch; // return the result after the loop ends
  }

}
