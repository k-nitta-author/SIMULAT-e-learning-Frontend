import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export interface Assignment {
  assignment_title: string;
  content_id: number;
  created_at: string;
  deadline: string;
  deadlineTime?: string;
  description: string;
  grading_criteria: string;
  id: number;
  instructions: string;
  max_score: number;
  submission_format: string;
  term?: {
    id: number;
    school_year_end: string;
    school_year_start: string;
  };
  scores?: {
    score: number;
    student_id: number;
    student_name: string;
    submission_date: string;
  }[];
  term_id: number;
  updated_at: string;
}

export interface AssignmentScore {
  score: number;
  submission_date: string;
  student_id: number;
  student_name: string;
  assignment_name: string;
  completed_on_time: boolean;
}

export interface AssignmentResponse {
  message: string;
  assignment?: Assignment;
  error?: string;
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

  getAssignmentScores(id: number): Observable<AssignmentScore[]> {
    return this.http.get<AssignmentScore[]>(`${this.apiUrl}/${id}/scores`).pipe(
      catchError(this.handleError)
    );
  }

  addAssignment(assignment: Assignment): Observable<AssignmentResponse> {
    return this.http.post<AssignmentResponse>(this.apiUrl, assignment).pipe(
      catchError(this.handleError)
    );
  }

  updateAssignment(id: number, updatedAssignment: Assignment): Observable<AssignmentResponse> {
    return this.http.put<AssignmentResponse>(`${this.apiUrl}/${id}`, updatedAssignment).pipe(
      catchError(this.handleError)
    );
  }

  deleteAssignment(id: number): Observable<AssignmentResponse> {
    return this.http.delete<AssignmentResponse>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}

