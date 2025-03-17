import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Placeholder model for content
export interface Content {
  course_id: string;            // Reference to the related course
  title: string;                // Title of the content
  description: string;          // Description of the content
  url: string;                  // URL to the content file or resource
  created_at: Date;             // Date the content was created
  term_id: string;              // Reference to the related term
  type: string;                 // Type of content (e.g., lecture, video, etc.)
  id: string;                   // Unique identifier for the content
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private apiUrl = 'https://simulat-e-learning-backend.onrender.com/content';

  constructor(private http: HttpClient) { }

  // Fetch all content
  getAllContent(): Observable<Content[]> {
    return this.http.get<Content[]>(this.apiUrl);
  }

  // Fetch a specific content by ID
  getContentById(id: string): Observable<Content | undefined> {
    return this.http.get<Content>(`${this.apiUrl}/${id}`);
  }

  // Add new content
  addContent(content: Content): Observable<Content> {
    return this.http.post<Content>(this.apiUrl, content);
  }

  // Update existing content
  updateContent(id: string, updatedContent: Content): Observable<Content | undefined> {
    return this.http.put<Content>(`${this.apiUrl}/${id}`, updatedContent);
  }

  // Delete content
  deleteContent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}