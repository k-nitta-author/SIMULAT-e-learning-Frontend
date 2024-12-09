import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private placeholderStudents = [
    {
      student_id: 'S001',
      given_name: 'Juan',
      middle_name: 'D.',
      surname: 'De la Cruz',
      date_of_birth: '2005-08-01',
      gender: 'Male',
      email: 'juand.delacruz@example.com',
      enrollment_date: '2023-09-01',
      username: 'juanddelacruz',
      password: 'password123',
      progress_score: 85,
    },
    {
      student_id: 'S002',
      given_name: 'Maria',
      middle_name: 'C.',
      surname: 'Reyes',
      date_of_birth: '2006-05-15',
      gender: 'Female',
      email: 'mariac.reyes@example.com',
      enrollment_date: '2023-09-01',
      username: 'mariacreyes',
      password: 'password123',
      progress_score: 90,
    },
  ];

  constructor() {}

  // Mock method to fetch all students
  getAllStudents(): Observable<any[]> {
    return of(this.placeholderStudents); // change to api endpoint
  }

  // Mock method for delete (updates local array only)
  deleteStudent(id: string): Observable<void> {
    this.placeholderStudents = this.placeholderStudents.filter(
      (student) => student.student_id !== id
    );
    return of(); // Return an empty observable to simulate delete
  }

  addStudent(student: any): Observable<any> {
    this.placeholderStudents.push(student);
    return of(student); // Return the added student as an observable
  }

  // Mock method for updating a student
  updateStudent(id: string, student: any): Observable<any> {
    const index = this.placeholderStudents.findIndex(
      (s) => s.student_id === id
    );
    if (index !== -1) {
      this.placeholderStudents[index] = { ...student };
    }
    return of(student); // Return the updated student as an observable
  }
}
