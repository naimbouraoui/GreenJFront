import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  
  private apiServerUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiServerUrl}/event/getAll`);
  }

  public getNewEvent(id: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiServerUrl}/event/getNewEvent/${id}`);
  }

  public participate(idEvent: number, idUser: number): Observable<void> {
    return this.http.post<void>(`${this.apiServerUrl}/event/participate/${idEvent}/${idUser}`, null);
  }

  public getById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiServerUrl}/event/getById/${id}`);
  }

  public add(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.apiServerUrl}/event/add`, event);
  }

  public update(event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiServerUrl}/event/update`, event);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/event/delete/${id}`);
  }

  public sendMail(idEvent: number, recipients: string[]): Observable<string> {
    return this.http.post<string>(`${this.apiServerUrl}/event/sendMail/${idEvent}`, recipients);
  }

}
