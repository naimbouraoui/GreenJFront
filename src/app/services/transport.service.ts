import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transport } from '../models/transport';

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  
  private apiServerUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Transport[]> {
    return this.http.get<Transport[]>(`${this.apiServerUrl}/transport/getAll`);
  }

  public getById(id: number): Observable<Transport> {
    return this.http.get<Transport>(`${this.apiServerUrl}/transport/getById/${id}`);
  }

  public add(transport: Transport): Observable<Transport> {
    return this.http.post<Transport>(`${this.apiServerUrl}/transport/add`, transport);
  }

  public update(transport: Transport): Observable<Transport> {
    return this.http.put<Transport>(`${this.apiServerUrl}/transport/update`, transport);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/transport/delete/${id}`);
  }

  public sendMail(listIds: number[]): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/transport/gasConsumption/`, listIds);
  }

}
