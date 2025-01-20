import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Instructor {
  instructor_id: string;
  name: string;
  email: string;
  department: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  private instructors: Instructor[] = [
    {
      instructor_id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      department: 'Computer Science',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      instructor_id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      department: 'Mathematics',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  constructor() {}

  // Fetch all instructors
  getAllInstructors(): Observable<Instructor[]> {
    return of(this.instructors);
  }

  // Add a new instructor
  addInstructor(instructor: Instructor): Observable<Instructor> {
    this.instructors.push(instructor);
    return of(instructor);
  }

  // Update an instructor
  updateInstructor(updatedInstructor: Instructor): Observable<Instructor> {
    const index = this.instructors.findIndex(
      (instructor) => instructor.instructor_id === updatedInstructor.instructor_id
    );

    if (index > -1) {
      this.instructors[index] = updatedInstructor;
      return of(updatedInstructor);
    }

    throw new Error('Instructor not found');
  }

  // Delete an instructor
  deleteInstructor(id: string): Observable<void> {
    const index = this.instructors.findIndex((instructor) => instructor.instructor_id === id);

    if (index > -1) {
      this.instructors.splice(index, 1);
      return of(undefined);
    }

    throw new Error('Instructor not found');
  }
}
