import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export interface Assignment {
  assignment_title: string;
  content_id: number;
  created_at: string;
  deadline: string;
  description: string;
  grading_criteria: string;
  id: number;
  instructions: string;
  max_score: number;
  submission_format: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private apiUrl = 'https://simulat-e-learning-backend.onrender.com/assignment';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  getAllAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getAssignmentById(id: number): Observable<Assignment | undefined> {
    return this.http.get<Assignment>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addAssignment(assignment: Assignment): Observable<Assignment> {
    return this.http.post<Assignment>(this.apiUrl, assignment).pipe(
      catchError(this.handleError)
    );
  }

  updateAssignment(id: number, updatedAssignment: Assignment): Observable<Assignment | undefined> {
    return this.http.put<Assignment>(`${this.apiUrl}/${id}`, updatedAssignment).pipe(
      catchError(this.handleError)
    );
  }

  deleteAssignment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}
