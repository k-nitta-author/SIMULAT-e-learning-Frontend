import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

export interface Course {
  id: number;
  course_code: string;
  course_name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Term {
  id: number;
  school_year_start: string;
  school_year_end: string;
}

export interface LessonMaterial {
  id: number;
  material_title: string;
  material_url: string;
  description: string;
  created_at: string;
}

export interface Content {
  id: number;
  course_id: number;
  title?: string;
  content_title?: string;
  description?: string;
  content_description?: string;
  url?: string;
  content_url?: string;
  type: string;
  term_id: number;
  created_at: string;
  course?: Course;
  term?: Term;
  lesson_materials?: LessonMaterial[];
}

export interface ServiceResponse<T> {
  message: string;
  data?: T;
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private apiEndpoint = 'https://simulat-e-learning-backend.onrender.com/content';

  constructor(private http: HttpClient) { }

  getAllContent(): Observable<Content[]> {
    return this.http.get<any[]>(this.apiEndpoint)
      .pipe(
        map(response => response.map(item => ({
          id: item.id,
          course_id: item.course_id,
          title: item.content_title,
          description: item.content_description,
          url: item.content_url,
          type: item.type || '',
          term_id: item.term_id || 0,
          created_at: item.created_at,
          course: item.course,
          term: item.term,
          lesson_materials: item.lesson_materials
        }))),
        catchError(error => throwError(() => error))
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

  createContent(content: Omit<Content, 'id' | 'created_at' | 'course' | 'term' | 'lesson_materials'>): Observable<ServiceResponse<Content>> {
    const payload = {
      course_id: content.course_id,
      title: content.title,
      description: content.description,
      url: content.url,
      type: content.type,
      term_id: content.term_id
    };
    return this.http.post<ServiceResponse<Content>>(this.apiEndpoint, payload);
  }

  updateContent(id: number, content: Partial<Content>): Observable<ServiceResponse<void>> {
    const payload = {
      course_id: content.course_id,
      title: content.title,
      description: content.description,
      url: content.url,
      type: content.type,
      term_id: content.term_id
    };
    return this.http.put<ServiceResponse<void>>(`${this.apiEndpoint}/${id}`, payload);
  }

  deleteContent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiEndpoint}/${id}`)
      .pipe(
        map(response => response),
        catchError(error => throwError(error))
      );
  }
}