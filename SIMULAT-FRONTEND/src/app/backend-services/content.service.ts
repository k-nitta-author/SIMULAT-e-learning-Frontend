import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Placeholder model for content
export interface Content {
  content_id: string;           // Unique ID for the content
  course_id: string;            // Reference to the related course
  content_type: string;         // Type of content (e.g., lecture, video, etc.)
  content_title: string;        // Title of the content
  content_description: string;  // Description of the content
  content_url: string;          // URL to the content file or resource
  created_at: Date;             // Date the content was created
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  // Dummy data for content
  private contents: Content[] = [
    {
      content_id: 'C001',
      course_id: 'CS101',
      content_type: 'Lecture',
      content_title: 'Introduction to Programming',
      content_description: 'This lecture covers the basics of programming and problem-solving using pseudocode.',
      content_url: 'https://example.com/intro-to-programming',
      created_at: new Date('2024-11-01')
    },
    {
      content_id: 'C002',
      course_id: 'CS102',
      content_type: 'Video',
      content_title: 'Understanding Algorithms',
      content_description: 'A video lecture explaining the fundamental concepts of algorithms and how they are designed.',
      content_url: 'https://example.com/understanding-algorithms',
      created_at: new Date('2024-11-05')
    }
  ];

  constructor() {}

  // Fetch all content (dummy data)
  getAllContent(): Observable<Content[]> {
    // Re-enable the API call here:
    // return this.http.get<Content[]>(this.apiUrl);
    return of(this.contents); // Return dummy data instead
  }

  // Fetch a specific content by ID (dummy data)
  getContentById(id: string): Observable<Content | undefined> {
    const content = this.contents.find(c => c.content_id === id);
    // Re-enable the API call here:
    // return this.http.get<Content>(`${this.apiUrl}/${id}`);
    return of(content); // Return dummy data instead
  }

  // Add new content (dummy data)
  addContent(content: Content): Observable<Content> {
    this.contents.push(content);
    // Re-enable the API call here:
    // return this.http.post<Content>(this.apiUrl, content);
    return of(content); // Return the newly added content
  }

  // Update existing content (dummy data)
  updateContent(id: string, updatedContent: Content): Observable<Content | undefined> {
    const index = this.contents.findIndex(c => c.content_id === id);
    if (index !== -1) {
      this.contents[index] = updatedContent;
      // Re-enable the API call here:
      // return this.http.put<Content>(`${this.apiUrl}/${id}`, updatedContent);
      return of(updatedContent); // Return updated content
    }
    return of(undefined); // Return undefined if content not found
  }

  // Delete content (dummy data)
  deleteContent(id: string): Observable<void> {
    this.contents = this.contents.filter(c => c.content_id !== id);
    // Re-enable the API call here:
    // return this.http.delete<void>(`${this.apiUrl}/${id}`);
    return of(); // Return an empty observable after deletion
  }
}
