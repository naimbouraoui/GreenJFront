import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Review} from "../models/review";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:9091/Reviews';
  review: Review = new Review();
  constructor(
    private http: HttpClient
  ) { }
  storageUserAsStr: any = localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser') || '{}')
    : null;
  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/ReviewList`);
  }
  deleteReview(id: number): Observable<boolean> {
    const url = `${this.apiUrl}deleteByIdRev/${id}`;
    return this.http.delete<boolean>(url);

  }
}
