import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Challenge } from '../general/interfaces/challenge';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  private apiUrl = 'https://simulat-e-learning-backend.onrender.com/challenge';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  getAllChallenges(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getChallengeById(id: number): Observable<Challenge | undefined> {
    return this.http.get<Challenge>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addChallenge(challenge: Omit<Challenge, 'id' | 'created_at' | 'updated_at'>): Observable<Challenge> {
    return this.http.post<Challenge>(this.apiUrl, challenge).pipe(
      catchError(this.handleError)
    );
  }

  updateChallenge(id: number, updatedChallenge: Partial<Challenge>): Observable<Challenge | undefined> {
    return this.http.put<Challenge>(`${this.apiUrl}/${id}`, updatedChallenge).pipe(
      catchError(this.handleError)
    );
  }

  deleteChallenge(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}

