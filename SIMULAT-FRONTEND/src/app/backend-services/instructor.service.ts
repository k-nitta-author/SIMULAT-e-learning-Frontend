import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Instructor {
  id: string;
  name_given: string;
  name_last: string;
  email: string;
  username: string;
  is_admin: boolean;
  is_super_admin: boolean;
  is_student: boolean;
  is_instructor: boolean;
  progress_score: number;
  gender: string;
  password?: string;
}

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  private apiUrl = 'https://simulat-e-learning-backend.onrender.com';

  constructor(private http: HttpClient) {}

  // Fetch all instructors
  getAllInstructors(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(`${this.apiUrl}/user/instructors`);
  }

  // Add a new instructor
  addInstructor(instructor: Partial<Instructor>): Observable<Instructor> {
    return this.http.post<{message: string}>(`${this.apiUrl}/user`, {
      ...instructor,
      is_instructor: true,
      is_student: false,
      is_admin: false,
      is_super_admin: false
    }).pipe(
      map(response => instructor as Instructor)
    );
  }

  // Delete an instructor
  deleteInstructor(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/user/${id}`);
  }

  // Get instructor by ID
  getInstructor(id: string): Observable<Instructor> {
    return this.http.get<Instructor>(`${this.apiUrl}/user/${id}`);
  }
}
