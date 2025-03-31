import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Term {
  id: number;
  school_year_start: string;
  school_year_end: string;
}

interface TermAllItems {
  term: Term;
  quizzes: Array<{
    id: number;
    content_id: number;
    quiz_title: string;
    description: string;
    time_limit: number;
    is_published: boolean;
  }>;
  assignments: Array<{
    id: number;
    assignment_title: string;
    content_id: number;
    description: string;
    deadline: string;
    max_score: number;
    submission_format: string;
  }>;
  courses: Array<{
    id: number;
    course_code: string;
    course_name: string;
    description: string;
    instructor_id: number;
    is_published: boolean;
  }>;
  content: Array<{
    id: number;
    type: string;
    title: string;
    description: string;
    url: string;
    course_id: number;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class TermsService {
  private apiUrl = 'https://simulat-e-learning-backend.onrender.com'; // Updated API URL

  constructor(private http: HttpClient) { }

  getAllTerms(): Observable<Term[]> {
    return this.http.get<Term[]>(`${this.apiUrl}/term`);
  }

  getTermById(id: number): Observable<Term> {
    return this.http.get<Term>(`${this.apiUrl}/term/${id}`);
  }

  createTerm(term: Omit<Term, 'id'>): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/term`, term);
  }

  updateTerm(id: number, term: Omit<Term, 'id'>): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/term/${id}`, term);
  }

  deleteTerm(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/term/${id}`);
  }

  getTermQuizzes(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/term/${id}/quizzes`);
  }

  getTermAssignments(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/term/${id}/assignments`);
  }

  getTermCourses(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/term/${id}/courses`);
  }

  getTermContent(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/term/${id}/content`);
  }

  getTermAllItems(id: number): Observable<TermAllItems> {
    return this.http.get<TermAllItems>(`${this.apiUrl}/term/${id}/all`);
  }
}
