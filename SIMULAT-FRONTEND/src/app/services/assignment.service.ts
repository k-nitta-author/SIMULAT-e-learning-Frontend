import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private apiUrl = 'your-api-endpoint/assignments';  // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  // Get all assignments
  getAllAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.apiUrl);
  }

  // Get a specific assignment by ID
  getAssignmentById(id: string): Observable<Assignment> {
    return this.http.get<Assignment>(`${this.apiUrl}/${id}`);
  }

  // Add a new assignment
  addAssignment(assignment: Assignment): Observable<Assignment> {
    return this.http.post<Assignment>(this.apiUrl, assignment);
  }

  // Update an existing assignment
  updateAssignment(id: string, assignment: Assignment): Observable<Assignment> {
    return this.http.put<Assignment>(`${this.apiUrl}/${id}`, assignment);
  }

  // Delete an assignment
  deleteAssignment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

// placeholder model until connected to backend
export interface Assignment {
  assignment_id: string;          // Unique ID for the assignment
  content_id: string;             // Reference to the related content
  assignment_title: string;       // Title of the assignment
  description: string;            // Description of the assignment
  deadline: Date;                 // Due date for the assignment
  max_score: number;              // Maximum score for grading
  file_url: string;               // URL to the file (if any)
  grading_criteria: string;       // Criteria used for grading
  instructions: string;           // Additional instructions for the assignment
  submission_format: string;      // Format for student submissions
  is_published: boolean;          // Indicates if the assignment is published or draft
  created_at: Date;               // Date the assignment was created
  updated_at: Date;               // Date the assignment was last updated
}
