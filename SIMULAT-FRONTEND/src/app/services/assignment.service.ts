import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Placeholder model for assignments
export interface Assignment {
  assignment_id: string;          // Unique ID for the assignment
  content_id: string;             // Reference to the related content
  assignment_title: string;       // Title of the assignment
  description: string;            // Description of the assignment
  deadline: Date | null;          // Due date for the assignment
  max_score: number;              // Maximum score for grading
  file_url: string;               // URL to the file (if any)
  grading_criteria: string;       // Criteria used for grading
  instructions: string;           // Additional instructions for the assignment
  submission_format: string;      // Format for student submissions
  is_published: boolean;          // Indicates if the assignment is published or draft
  created_at: Date;               // Date the assignment was created
  updated_at: Date;               // Date the assignment was last updated
}

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  // Define dummy data here
  private assignments: Assignment[] = [
    {
      assignment_id: '1',
      content_id: 'C001',
      assignment_title: 'TAP: Think and Play!',
      description: 'GEARING UP: Techno Hacks',
      deadline: new Date('2024-12-01'),
      max_score: 100,
      file_url: '',
      grading_criteria: 'Accuracy and completeness',
      instructions: 'The assigned students of the day will present their computer trivia to the class. Submit a PDF file of your presentation.',
      submission_format: 'PDF',
      is_published: true,
      created_at: new Date('2024-10-01'),
      updated_at: new Date('2024-10-05')
    },
    {
      assignment_id: '2',
      content_id: 'C002',
      assignment_title: 'MARI: Master and Reinforce It!',
      description: 'Nowm let us try what you have learned.',
      deadline: new Date('2024-12-15'),
      max_score: 150,
      file_url: '',
      grading_criteria: 'True or False',
      instructions: 'Write true on the blank provided if the statement is true, otherwire write false.',
      submission_format: 'Form',
      is_published: true,
      created_at: new Date('2024-10-02'),
      updated_at: new Date('2024-10-06')
    }
    // Additional dummy data can be added here
  ];

  constructor() {}

  // Replace with backend connection later
  getAllAssignments(): Observable<Assignment[]> {
    return of(this.assignments);  // Returns the dummy data
  }

  

  // Get a specific assignment by ID
  getAssignmentById(id: string): Observable<Assignment | undefined> {
    const assignment = this.assignments.find(assignment => assignment.assignment_id === id);
    return of(assignment);  // Returns a single assignment from dummy data
  }

  // Add a new assignment to dummy data
  addAssignment(assignment: Assignment): Observable<Assignment> {
    this.assignments.push(assignment);
    return of(assignment);  // Returns the added assignment
  }

  // Update an existing assignment in dummy data
  updateAssignment(id: string, updatedAssignment: Assignment): Observable<Assignment | undefined> {
    const index = this.assignments.findIndex(assignment => assignment.assignment_id === id);
    if (index !== -1) {
      this.assignments[index] = updatedAssignment;
      return of(updatedAssignment);  // Returns the updated assignment
    }
    return of(undefined);  // Return undefined if assignment not found
  }

  // Delete an assignment from dummy data
  deleteAssignment(id: string): Observable<void> {
    this.assignments = this.assignments.filter(assignment => assignment.assignment_id !== id);
    return of();  // Returns an empty observable after deletion
  }
}
