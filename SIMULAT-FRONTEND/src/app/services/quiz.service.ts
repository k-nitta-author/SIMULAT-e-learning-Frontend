import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'your-api-endpoint/quiz';  // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  // Get all quizzes
  getAllQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.apiUrl);
  }

  // Get a specific quiz by ID
  getQuizById(id: string): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.apiUrl}/${id}`);
  }

  // Add a new quiz
  addQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(this.apiUrl, quiz);
  }

  // Update an existing quiz
  updateQuiz(id: string, quiz: Quiz): Observable<Quiz> {
    return this.http.put<Quiz>(`${this.apiUrl}/${id}`, quiz);
  }

  // Delete a quiz
  deleteQuiz(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

// placeholder model until connected to backend
export interface Quiz {
  quiz_id: string;         // Unique ID for the quiz
  content_id: string;      // Reference to the related content
  quiz_title: string;      // Title of the quiz
  description: string;     // Description of the quiz
  time_limit: number;      // Time limit for completing the quiz
  is_published: boolean;   // Indicates if the quiz is published or draft
  created_at: Date;        // Date the quiz was created
  updated_at: Date;        // Date the quiz was last updated
}
