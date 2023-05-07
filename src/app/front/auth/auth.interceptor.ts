import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { UserAuthService } from "src/app/services/user-auth.service";
import{catchError}from "rxjs/operators";
import {Observable ,throwError}from "rxjs";
import { Injectable } from '@angular/core';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
   
   constructor(private router :Router,private userAuthService :UserAuthService) {
    
   }
   
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        
        if (req.headers.get('No-Auth')==='True'){
            return next.handle(req.clone());
        }
        const token = this.userAuthService.getToken();
        req =this.addToken(req,token);
        return next.handle(req).pipe
        (catchError(
            (err:HttpErrorResponse)=>{
                console.log(err.status);
                if(err.status===401){
                    this.router.navigate(['/login']);

                }else if (err.status===403){
                    this.router.navigate(['/home']);
                }
                return throwError("Somthing went wrong ")
            }
        ));
    }
    private addToken (request :HttpRequest<any>,token:any){
        return request.clone(
            {
                setHeaders:{
                    Authorization:`´Bearer ${token}`
                }
            }
        )
    }
}