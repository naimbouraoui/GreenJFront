import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Reclamation} from "../models/reclamation";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  private apiUrl = 'http://localhost:9091/Reclamation';
  reclamations: Reclamation = new Reclamation();
  constructor(
    private http: HttpClient
  ) { }
  storageUserAsStr: any = localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser') || '{}')
    : null;
  getReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.apiUrl}/listeReclamations`);
  }
  deleteReclamtion(id: number): Observable<boolean> {
    const url = `${this.apiUrl}deleteByIdRec/${id}`;
    return this.http.delete<boolean>(url);
  }
  createReclamation(reclamation: Reclamation): Observable<Reclamation> {
    return this.http.post<Reclamation>(`${this.apiUrl}/addRec`, reclamation);
  }
}

