import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

export interface Content {
  id: number;
  content_title: string;
  content_description: string;
  content_url: string;
  content_type: string;
  course_id: number;
  term_id: number;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private apiEndpoint = 'https://simulat-e-learning-backend.onrender.com/content';

  constructor(private http: HttpClient) { }

  getAllContent(): Observable<Content[]> {
    return this.http.get<Content[]>(this.apiEndpoint)
      .pipe(
        map(response => response),
        catchError(error => throwError(error))
      );
  }

  getContentById(id: number): Observable<Content> {
    return this.http.get<Content>(`${this.apiEndpoint}/${id}`)
      .pipe(
        map(response => response),
        catchError(error => throwError(error))
      );
  }

  getContentByCourseId(courseId: number): Observable<Content[]> {
    return this.http.get<Content[]>(`${this.apiEndpoint}/course/${courseId}`)
      .pipe(
        map(response => response),
        catchError(error => throwError(error))
      );
  }

  createContent(content: Omit<Content, 'id' | 'created_at'>): Observable<Content> {
    const payload = {
      title: content.content_title,
      description: content.content_description,
      url: content.content_url,
      type: content.content_type,
      course_id: content.course_id,
      term_id: content.term_id
    };
    
    return this.http.post<Content>(this.apiEndpoint, payload)
      .pipe(
        map(response => response),
        catchError(error => throwError(error))
      );
  }

  updateContent(id: number, content: Partial<Content>): Observable<Content> {
    return this.http.put<Content>(`${this.apiEndpoint}/${id}`, content)
      .pipe(
        map(response => response),
        catchError(error => throwError(error))
      );
  }

  deleteContent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiEndpoint}/${id}`)
      .pipe(
        map(response => response),
        catchError(error => throwError(error))
      );
  }
}