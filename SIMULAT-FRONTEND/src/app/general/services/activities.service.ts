import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Activity {
  id: number;
  score: number;
  title: string;
}

export interface ActivitiesData {
  assignments: {
    completed: Activity[];
    pending: Activity[];
  };
  challenges: {
    completed: Activity[];
    pending: Activity[];
  };
  quizzes: {
    completed: Activity[];
    pending: Activity[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  private baseUrl = 'https://simulat-e-learning-backend.onrender.com';

  constructor(private http: HttpClient) { }

  getActivities(): Observable<ActivitiesData> {
    const userId = localStorage.getItem('user_id') || '1';
    const url = `${this.baseUrl}/user/${userId}/assessment-status`;
    
    return this.http.get<ActivitiesData>(url).pipe(
      catchError(error => {
        console.error('Error fetching activities:', error);
        return throwError(() => error);
      })
    );
  }
}
