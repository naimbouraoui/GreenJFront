import { Accomodation } from './../models/accomodation';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { FormGroup } from '@angular/forms';
<<<<<<< HEAD
=======
import { Chambre } from '../models/chambre';
import { Typech } from '../models/typech';
>>>>>>> origin/houssem-branch

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
  public dataForm!: FormGroup;
  constructor(
    private http: HttpClient
  ) { }

  getList():Observable<Accomodation[]> {
    return this.http.get<Accomodation[]>(this.baseUrl);
  }
  getListByNeeds(ville:any,datedebut:Date,datefin:Date,tyrooms:any):Observable<Accomodation[]>{
    const nom="DispoAccomodations";
<<<<<<< HEAD
    return this.http.get<Accomodation[]>(`${this.baseUrl}//${ville}/${datedebut}/${datefin}/${tyrooms}`)
=======
    return this.http.get<Accomodation[]>(`${this.baseUrl}/${nom}/${ville}/${datedebut}/${datefin}/${tyrooms}`)
>>>>>>> origin/houssem-branch
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

  addAcc(formData:FormData): Observable<any> {
    console.log(formData);
    return this.http.post(this.baseUrl+ '/add',formData);
}
getAccbyId(id:number):Observable<Accomodation>{
  return this.http.get<Accomodation>(`${this.baseUrl}/${id}`);
}
modifierAcc(formData:FormData): Observable<any> {
  return this.http.put(this.baseUrl, formData);
}
<<<<<<< HEAD
=======
getRoomsForReservation(ida:number,DateDeb:Date,DateFin:Date, typeschambres:Array<Typech>):Observable<Chambre[]>{
  return this.http.get<Chambre[]>(`${this.baseUrl}/Disporooms/${ida}/${DateDeb}/${DateFin}/${typeschambres}`);
}
>>>>>>> origin/houssem-branch
}
