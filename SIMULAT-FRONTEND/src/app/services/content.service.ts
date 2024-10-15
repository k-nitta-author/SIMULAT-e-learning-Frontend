import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private apiUrl = 'your-api-endpoint/content';  // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  // Get all content items
  getAllContent(): Observable<Content[]> {
    return this.http.get<Content[]>(this.apiUrl);
  }

  // Get a specific content item by ID
  getContentById(id: string): Observable<Content> {
    return this.http.get<Content>(`${this.apiUrl}/${id}`);
  }

  // Add new content
  addContent(content: Content): Observable<Content> {
    return this.http.post<Content>(this.apiUrl, content);
  }

  // Update existing content
  updateContent(id: string, content: Content): Observable<Content> {
    return this.http.put<Content>(`${this.apiUrl}/${id}`, content);
  }

  // Delete content
  deleteContent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

// placeholder model until connected to backend
export interface Content {
  content_id: string;           // Unique ID for the content
  course_id: string;            // Reference to the related course
  content_type: string;         // Type of content (e.g., lecture, video, etc.)
  content_title: string;        // Title of the content
  content_description: string;   // Description of the content
  content_url: string;          // URL to the content file or resource
  created_at: Date;             // Date the content was created
}
