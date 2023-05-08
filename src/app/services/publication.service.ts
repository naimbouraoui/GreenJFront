import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publication } from '../models/Publication.model';
import { CommentService } from './comment.service';
import { Reaction } from '../models/Reaction.model';
import { React } from '../models/React.enum';


@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private BASE_URL = 'http://localhost:9091/publication';

  constructor(private http: HttpClient) { }

  getAllPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.BASE_URL}/Publication`);
  }

  addPublication(publication: Publication): Observable<Publication> {
    return this.http.post<Publication>(`${this.BASE_URL}/Add`, publication);
  }

  addReaction(publicationId: number, reactionType: string): Observable<Publication> {
    return this.http.post<Publication>(`${this.BASE_URL}/${publicationId}/reactions`, { reactionType });
  }

  addComment(publicationId: number, commentText: string): Observable<Publication> {
    return this.http.post<Publication>(`${this.BASE_URL}/${publicationId}/comments`, { commentText });
  }

  deletePublication(publicationId: number): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}/Delete/${publicationId}`);
  }

  updatePublication(publication: Publication): Observable<Publication> {
    return this.http.post<Publication>(`${this.BASE_URL}/Publication/update`, publication);
  }

  addReactionToPublication(publicationId: number, react: React): Observable<Publication> {
    return this.http.post<Publication>(`${this.BASE_URL}/Publication/${publicationId}/addReaction`, react);
  }
}
