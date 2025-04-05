import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Course } from '../general/interfaces/course';


interface ActivityScore {
  score: number;
  submission_date: string;
}

interface AssignmentScore extends ActivityScore {
  assignment_id: number;
}

interface ChallengeScore extends ActivityScore {
  challenge_id: number;
}

interface QuizScore extends ActivityScore {
  quiz_id: number;
}

interface CourseScores {
  assignments: AssignmentScore[];
  challenges: ChallengeScore[];
  quizzes: QuizScore[];
}

export interface EnrolledCourse {
  completion_percentage: number;
  course_code: string;
  course_name: string;
  description: string;
  id: number;
  instructor_id: number;
  is_published: boolean;
  scores: CourseScores;
  term_id: number;
}


@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = 'https://simulat-e-learning-backend.onrender.com/course';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      catchError(this.handleError)
    );
  }

  updateCourse(id: number, updatedCourse: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, updatedCourse).pipe(
      catchError(this.handleError)
    );
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getEnrolledCourses(userId: number): Observable<EnrolledCourse[]> {
    return this.http.get<EnrolledCourse[]>(`${this.apiUrl.replace('/course', '')}/user/${userId}/enrolled-courses`).pipe(
      catchError(this.handleError)
    );
  }

  getNotEnrolledCourses(userId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl.replace('/course', '')}/user/${userId}/not-enrolled-courses`).pipe(
      catchError(this.handleError)
    );
  }

  enrollInCourse(userId: number, courseId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl.replace('/course', '')}/user/${userId}/enroll/${courseId}`, {}).pipe(
      catchError(this.handleError)
    );
  }

  publishCourse(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/publish`, {}).pipe(
      catchError(this.handleError)
    );
  }

  getAllScores(courseId: number): Observable<CourseScore> {
    return this.http.get<CourseScore>(`${this.apiUrl}/${courseId}/scores`).pipe(
      catchError(this.handleError)
    );
  }

  gradeQuiz(courseId: number, quizId: number, userId: number, score: number | null): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${courseId}/quiz/${quizId}/grade/${userId}`,
      { score }
    ).pipe(
      catchError(this.handleError)
    );
  }

  gradeAssignment(courseId: number, assignmentId: number, userId: number, score: number | null): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${courseId}/assignment/${assignmentId}/grade/${userId}`,
      { score }
    ).pipe(
      catchError(this.handleError)
    );
  }

  gradeChallenge(courseId: number, challengeId: number, userId: number, score: number | null): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${courseId}/challenge/${challengeId}/grade/${userId}`,
      { score }
    ).pipe(
      catchError(this.handleError)
    );
  }

  completeQuiz(courseId: number, quizId: number, userId: number): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/${courseId}/quiz/${quizId}/complete/${userId}`,
      {}
    ).pipe(
      catchError(this.handleError)
    );
  }

  completeAssignment(courseId: number, assignmentId: number, userId: number): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/${courseId}/assignment/${assignmentId}/complete/${userId}`,
      {}
    ).pipe(
      catchError(this.handleError)
    );
  }

  completeChallenge(courseId: number, challengeId: number, userId: number): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/${courseId}/challenge/${challengeId}/complete/${userId}`,
      {}
    ).pipe(
      catchError(this.handleError)
    );
  }
}

// Keep only the CourseScore interface as it's still needed for getAllScores
interface CourseScore {
  assignments: {
    id: number;
    title: string;
    deadline: string | null;
    scores: {
      student_id: number;
      score: number;
      submission_date: string;
      pending: boolean;
    }[];
  }[];
  quizzes: {
    id: number;
    title: string;
    scores: {
      student_id: number;
      score: number;
      submission_date: string;
      pending: boolean;
    }[];
  }[];
  challenges: {
    id: number;
    title: string;
    scores: {
      student_id: number;
      score: number;
      submission_date: string;
      pending: boolean;
    }[];
  }[];
}


