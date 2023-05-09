import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Activity} from "../models/activity";
import {catchError, Observable, tap} from "rxjs";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private apiUrl = 'http://localhost:9091/api/Activities';
  activity: Activity = new Activity();
  constructor(
    private http: HttpClient
  ) { }
  storageUserAsStr: any = localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser') || '{}')
    : null;
  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiUrl}/listeActivities`);
  }

  post_options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  deleteActivity(id: number): Observable<boolean> {
    const url = `${this.apiUrl}/deleteByIdAct/${id}`;
    return this.http.delete<boolean>(url);
  }

  addActivity(activity: Activity): Observable<any> {
    const url = `${this.apiUrl}/addActivity`;
    return this.http.post<Activity>(url, activity, this.post_options).pipe(
      tap(activity => console.log(`Activity added successfully: ${JSON.stringify(activity)}`)),
      catchError(error => {
        console.error('Error adding activity:', error);
        throw error;
      })
    );
  }
  updateActivity(id :number): Observable<any> {
    const url = `${this.apiUrl}/updateAct/${id}`;
    return this.http.put<Activity>(url, id, this.post_options).pipe(
      tap(activity => console.log(`Activity updated successfully: ${JSON.stringify(activity)}`)),
      catchError(error => {
        console.error('Error updating activity:', error);
        throw error;
      })
    );
  }
  assignCurrentUserToActivity(activityId: number, userId: number): Observable<any> {
    const url = `${this.apiUrl}/${activityId}/assign-user/${userId}`;
    return this.http.post<Activity>(url, {}, this.post_options).pipe(
      tap(activity => console.log(`Activity assigned succesfully: ${JSON.stringify(activity)}`)),
      catchError(error => {
        console.error('Error adding user to activity:', error);
        throw error;
      })
    );
  }




}
