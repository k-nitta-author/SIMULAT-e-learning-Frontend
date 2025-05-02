import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { CourseProgress } from '../general/interfaces/course-progress';

export interface Student {
  id: number;
  username: string;
  password: string;  // Add this line
  email: string;
  name_given: string;
  name_last: string;
  gender: string;
  is_admin: boolean;
  is_instructor: boolean;
  is_student: boolean;
  is_super_admin: boolean;
  overall_progress: number;
  progress_score: number;
  course_progress: CourseProgress[];  // Add this line
  active: boolean;  // Add this line
}

export interface UserPrivileges {
  is_admin: boolean;
  is_instructor: boolean;
  is_student: boolean;
  is_super_admin: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'https://simulat-e-learning-backend.onrender.com';

  constructor(private http: HttpClient) {}

  // Gets all students
  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/user`);
  }

  // Gets individual students
  getStudent(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/user/${id}`);
  }

  // Gets student by ID
  getStudentById(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/user/${id}`);
  }

  // Gets all instructors
  getAllInstructors(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/user/instructors`);
  }

  // Gets detailed list of students
  getAllStudentsDetailed(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/user/students`);
  }

  // Gets the student and returns a list of the badges they have earned
  getStudentBadges(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${id}/badges`);
  }

  // Gets all admin-level users
  getAllAdmins(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/user/admin`);
  }

  // Creates a new user
  createStudent(student: Student): Observable<Student> {
    const studentData = {
      ...student,
      active: true  // Set default active status
    };
    return this.http.post<Student>(`${this.apiUrl}/user`, studentData);
  }

  // Deletes a user
  deleteStudent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/user/${id}`);
  }

  // Updates user data
  updateStudent(id: string, student: Student): Observable<Student> {
    const studentData = {
      ...student,
      active: student.active ?? true  // Preserve active status or default to true
    };
    return this.http.put<Student>(`${this.apiUrl}/user/${id}`, studentData);
  }

  // Grants or takes away user privileges
  grantPrivileges(id: string, privileges: UserPrivileges): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/user/${id}/grant`, privileges);
  }

  // Gets the user's quiz scores if they have any
  getStudentQuizScores(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${id}/q/scores`);
  }

  // Gets the user's scores for the challenges
  getStudentChallengeScores(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${id}/c/scores`);
  }

  // Gets the study groups that a user is enrolled into
  getStudentStudyGroups(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${id}/studygroups/`);
  }

  // Gets the user's assignment scores
  getStudentAssignmentScores(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${id}/a/scores`);
  }

  // Gets the user's courses
  getStudentCourses(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${id}/courses`);
  }

  // Gets the user's all scores
  getStudentAllScores(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${id}/all-scores`);
  }

  // Add method to toggle active status
  toggleUserActive(id: string, active: boolean): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/user/${id}`, { active });
  }
}

