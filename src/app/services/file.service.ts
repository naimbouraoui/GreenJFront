import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  baseUrl = 'http://localhost:9091/api/File';
  storageUserAsStr: any = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser') || '{}')
  : null;
  constructor(private httpClient: HttpClient) { }


  uploadFile(file: File): Observable<HttpEvent<any>>
  {
    const formData : FormData = new FormData(); //Stores Key Value Pairs
    formData.append('file',file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`,formData, {
      reportProgress:true,
      responseType:'json'
    });
    return this.httpClient.request(req);
  }

  uploadAccomodationFileByAccId(file: File,AccId:number): Observable<HttpEvent<any>>
  {
    const formData : FormData = new FormData(); //Stores Key Value Pairs
    formData.append('file',file);

    const req = new HttpRequest('POST', `${this.baseUrl}/accomodation/${AccId}`,formData, {
      reportProgress:true,
      responseType:'json'
    });
    return this.httpClient.request(req);
  }

  getAccomodationFilesByAccId(AccId:number): Observable<any>
  {
    return this.httpClient.get(`${this.baseUrl}/files${AccId}`)
  }

  getAccomodationFiles(): Observable<any>
  {
    return this.httpClient.get(`${this.baseUrl}`)
  }

}
