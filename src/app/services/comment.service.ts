import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/Coment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private BASE_URL = 'http://localhost:9091/Comment';

  constructor(private http: HttpClient) { }

  getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.BASE_URL}/comments`);
  }

  addComments(publication: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.BASE_URL}/Add`, publication);
  }


  deleteComments(publicationId: number): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}/Delete/${publicationId}`);
  }
  getComments(publicationId: number): Observable<any> {
    return this.http.get<Comment>(`http://localhost:9091/publication/Publication/${publicationId}/comments`);
  }

  updateComments(publication: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.BASE_URL}/comments/update`, publication);
  }
  getComment(publicationId: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.BASE_URL}/publications/${publicationId}/comments`);
  }

  addCommentToPublication(publicationId: number, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.BASE_URL}/publications/${publicationId}/comments`, comment);
  }

}
