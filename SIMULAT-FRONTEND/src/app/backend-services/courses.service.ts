import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Course } from '../general/interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = 'https://simulat-e-learning-backend.onrender.com/course';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      catchError(this.handleError)
    );
  }

  updateCourse(id: number, updatedCourse: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, updatedCourse).pipe(
      catchError(this.handleError)
    );
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getEnrolledCourses(userId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl.replace('/course', '')}/user/${userId}/enrolled-courses`).pipe(
      catchError(this.handleError)
    );
  }

  getNotEnrolledCourses(userId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl.replace('/course', '')}/user/${userId}/not-enrolled-courses`).pipe(
      catchError(this.handleError)
    );
  }

  enrollInCourse(userId: number, courseId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl.replace('/course', '')}/user/${userId}/enroll/${courseId}`, {}).pipe(
      catchError(this.handleError)
    );
  }
}

