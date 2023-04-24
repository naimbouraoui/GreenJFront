import { Accomodation } from './../models/accomodation';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class AccomodationService {
  baseUrl = 'http://localhost:9091/accomodation';
  accomodation: Accomodation = new Accomodation();
  constructor(
    private http: HttpClient
  ) { }
  storageUserAsStr: any = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser') || '{}')
  : null;
  getList():Observable<Accomodation[]> {
    return this.http.get<Accomodation[]>(this.baseUrl);
  }
  post_options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  deleteAccomodation(id: number): Observable<boolean> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<boolean>(url);
  }
  Delete(id: number) {
    return this.http.post(this.baseUrl+'/Chambre', {id});


  }
}
