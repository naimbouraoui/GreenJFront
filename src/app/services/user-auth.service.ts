import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }
  public setRoles (roles:[]){
    localStorage.setItem("roles",JSON.stringify(roles)); 
  }
  public getRoles(): string [] {
    const rolesString = localStorage.getItem('roles');
    if (rolesString === null) {
      // handle the case where the 'roles' key is not found in the local storage
      return [];
    } else {
      const roles = JSON.parse(rolesString);
      return roles;
    }
  }
  public setToken (jwtToken:string){
    localStorage.setItem("jwtToken",jwtToken);
  }
  public getToken(): string | null {
    const token = localStorage.getItem('jwtToken');
    if (token === null) {
      // handle the case where the 'jwtToken' key is not found in the local storage
      return null;
    } else {
      return token;
    }
  }
  
  public clear (){
    localStorage.clear();
  }
  public isLggedIn(){
    return this.getRoles()&&this.getToken();
  }
  
}
