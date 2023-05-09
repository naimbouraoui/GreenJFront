import { Chambre } from './../models/chambre';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
}
@Injectable({
  providedIn: 'root'
})
export class ChambreService {

    baseUrl = 'http://localhost:9091/api/Chambre';
    chambre: Chambre = new Chambre();
    public dataForm!: FormGroup;

  constructor(private http:HttpClient) { }
  post_options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  getchambreList():Observable<Chambre[]>{
    return this.http.get<Chambre[]>(this.baseUrl);
    }
    getChById(id:any):Observable<Chambre>{
      return this.http.get<Chambre>(`${this.baseUrl}/${id}`);
    }
    addCh(formData:FormData): Observable<any> {
      return this.http.put(this.baseUrl, formData);
    }
    addroom(formData:FormData): Observable<any> {
    return this.http.post(this.baseUrl, formData);
    }
deleteChambre(id: number): Observable<boolean> {
  const url = `${this.baseUrl}/${id}`;
  return this.http.delete<boolean>(url);
}
RoomsPrice(formData:FormData,nbchilds:Array<number>,Option:string):Observable<any>{
  return this.http.post<any>(`${this.baseUrl}/prix/${nbchilds}/${Option}`,formData);
}
}
