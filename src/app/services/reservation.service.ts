import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  baseUrl = 'http://localhost:9091/Reservation';
  reservation: Reservation = new Reservation();

  constructor( private http: HttpClient) { }
  getReservationsList():Observable<Reservation[]>{
  return this.http.get<Reservation[]>(this.baseUrl);
  }
  calculerNBjours(id:number):Observable<number>{
    return this.http.put<number>(this.baseUrl+'/periode/'+ id,null);
  }
}
