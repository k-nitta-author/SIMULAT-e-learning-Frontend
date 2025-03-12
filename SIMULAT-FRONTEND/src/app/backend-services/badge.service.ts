import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Badge {
    id: number;
    name: string;
    description: string;
    pts_required: number;
}

@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  private apiEndpoint = 'https://simulat-e-learning-backend.onrender.com/badge';

  constructor(private http: HttpClient) { }

  /**
   * Retrieves all badges from the backend
   * @returns Observable<Badge[]> - Array of all badges
   */
  getAllBadges(): Observable<Badge[]> {
    return this.http.get<Badge[]>(this.apiEndpoint)
      .pipe(
        map(response => response),
        catchError(error => throwError(error))
      );
  }

  /**
   * Retrieves a specific badge by its ID
   * @param id - The ID of the badge to retrieve
   * @returns Observable<Badge> - The requested badge
   */
  getBadgeById(id: number): Observable<Badge> {
    return this.http.get<Badge>(`${this.apiEndpoint}/${id}`)
      .pipe(
        map(response => response),
        catchError(error => throwError(error))
      );
  }

  /**
   * Creates a new badge in the backend
   * @param badge - The badge data to create
   * @returns Observable<Badge> - The created badge
   */
  createBadge(badge: Badge): Observable<Badge> {
    return this.http.post<Badge>(this.apiEndpoint, badge)
      .pipe(
        map(response => response),
        catchError(error => throwError(error))
      );
  }

  /**
   * Deletes a badge from the backend
   * @param id - The ID of the badge to delete
   * @returns Observable<any> - The deletion response
   */
  deleteBadge(id: number): Observable<any> {
    return this.http.delete(`${this.apiEndpoint}/${id}`)
      .pipe(
        map(response => response),
        catchError(error => throwError(error))
      );
  }

  /**
   * Updates an existing badge in the backend
   * @param id - The ID of the badge to update
   * @param badge - The updated badge data
   * @returns Observable<Badge> - The updated badge
   */
  updateBadge(id: number, badge: Badge): Observable<Badge> {
    return this.http.put<Badge>(`${this.apiEndpoint}/${id}`, badge)
      .pipe(
        map(response => response),
        catchError(error => throwError(error))
      );
  }

}

