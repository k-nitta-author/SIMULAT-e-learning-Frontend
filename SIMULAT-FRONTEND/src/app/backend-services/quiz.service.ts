import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Quiz {
  quiz_id: string;
  content_id: string;
  quiz_title: string;
  description: string;
  time_limit: number;
  is_published: boolean;
  created_at: Date;
  updated_at: Date;
}

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private placeholderQuizzes: Quiz[] = [
    {
      quiz_id: '1',
      content_id: 'content1',
      quiz_title: 'Sample Quiz 1',
      description: 'Description for Sample Quiz 1',
      time_limit: 30,
      is_published: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      quiz_id: '2',
      content_id: 'content2',
      quiz_title: 'Sample Quiz 2',
      description: 'Description for Sample Quiz 2',
      time_limit: 20,
      is_published: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  constructor() {}

  // Placeholder implementation to simulate fetching all quizzes
  getAllQuizzes(): Observable<Quiz[]> {
    // Replace this with an HTTP GET request to your API
    // Example: return this.http.get<Quiz[]>(this.apiUrl);
    return of(this.placeholderQuizzes);
  }

  // Placeholder for fetching a single quiz by ID
  getQuizById(id: string): Observable<Quiz | undefined> {
    // Replace this with an HTTP GET request to your API
    // Example: return this.http.get<Quiz>(`${this.apiUrl}/${id}`);
    return of(this.placeholderQuizzes.find((quiz) => quiz.quiz_id === id));
  }

  // Placeholder for adding a new quiz
  addQuiz(quiz: Quiz): Observable<Quiz> {
    // Replace this with an HTTP POST request to your API
    // Example: return this.http.post<Quiz>(this.apiUrl, quiz);
    this.placeholderQuizzes.push(quiz);
    return of(quiz);
  }

  // Placeholder for updating an existing quiz
  updateQuiz(id: string, quiz: Quiz): Observable<Quiz> {
    // Replace this with an HTTP PUT request to your API
    // Example: return this.http.put<Quiz>(`${this.apiUrl}/${id}`, quiz);
    const index = this.placeholderQuizzes.findIndex((q) => q.quiz_id === id);
    if (index !== -1) {
      this.placeholderQuizzes[index] = quiz;
    }
    return of(quiz);
  }

  // Placeholder for deleting a quiz
  deleteQuiz(id: string): Observable<void> {
    // Replace this with an HTTP DELETE request to your API
    // Example: return this.http.delete<void>(`${this.apiUrl}/${id}`);
    this.placeholderQuizzes = this.placeholderQuizzes.filter(
      (quiz) => quiz.quiz_id !== id
    );
    return of();
  }
}
