import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

export interface Quiz {
  id: string;
  content_id: string;
  quiz_title: string;
  term_id: string;
  description: string;
  time_limit: number;
  is_published: boolean;
}


@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './quizzes-list.component.html',
  styleUrls: ['./quizzes-list.component.css']
})
export class QuizListComponent implements OnInit {
  quizzes: Quiz[] = [];

  isModalOpen = false;
  isEditing = false;
  modalQuiz: Quiz = this.getEmptyQuiz();
  hasEditPermission: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getQuizzes();
    this.checkUserPermissions();
  }

  checkUserPermissions(): void {
    const isAdmin = localStorage.getItem('is_admin') === 'true';
    const isInstructor = localStorage.getItem('is_instructor') === 'true';
    const isSuperAdmin = localStorage.getItem('is_super_admin') === 'true';
    this.hasEditPermission = isAdmin || isInstructor || isSuperAdmin;
  }

  // GET all quizzes
  getQuizzes(): void {
    const url = 'https://simulat-e-learning-backend.onrender.com/quiz';
    this.http.get<Quiz[]>(url).subscribe(
      res => {
        console.log('Quizzes loaded', res);
        this.quizzes = res;
      },
      err => console.error('Error loading quizzes', err)
    );
  }

  // Open modal for add or edit
  openModal(quiz?: Quiz): void {
    this.isModalOpen = true;
    if (quiz) {
      this.isEditing = true;
      this.modalQuiz = { ...quiz };
    } else {
      this.isEditing = false;
      this.modalQuiz = this.getEmptyQuiz();
    }
  }

  // Close modal and reset modalQuiz
  closeModal(): void {
    this.isModalOpen = false;

    // reflect edits in the quiz list
    if (this.isEditing) {
      const index = this.quizzes.findIndex(q => q.id === this.modalQuiz.id);
      if (index !== -1) {
        this.quizzes[index] = this.modalQuiz;
      }
    }
    
    // add quiz to list if it's a new quiz
    if (!this.isEditing) {
      this.quizzes.push(this.modalQuiz);
    }

  }

  // Save quiz via POST (add) or PUT (edit)
  saveQuiz(): void {
    if (this.isEditing) {
      const url = `https://simulat-e-learning-backend.onrender.com/quiz/${this.modalQuiz.id}`;
      this.http.put<Quiz>(url, this.modalQuiz).subscribe(
        res => {
          console.log('Quiz updated', res);
          const index = this.quizzes.findIndex(q => q.id === res.id);
          if (index !== -1) {
            this.quizzes[index] = res;
          }
          this.closeModal();
        },
        err => console.error('Error updating quiz', err)
      );
    } else {
      const url = 'https://simulat-e-learning-backend.onrender.com/quiz';
      console.log('Sending quiz data:', this.modalQuiz);
      this.http.post<Quiz>(url, this.modalQuiz).subscribe(
        res => {
          console.log('Quiz saved', res);
          this.quizzes.push(res);
          this.closeModal();
        },
        err => console.error('Error saving quiz', err)
      );
    }
  }

  // DELETE a quiz
  deleteQuiz(quizId: string): void {
    const url = `https://simulat-e-learning-backend.onrender.com/quiz/${quizId}`;
    this.http.delete(url).subscribe(
      () => {
        console.log('Quiz deleted successfully');
        this.quizzes = this.quizzes.filter(quiz => quiz.id !== quizId);
      },
      err => console.error('Error deleting quiz', err)
    );
  }

  // Utility to get an empty quiz object
  private getEmptyQuiz(): Quiz {
    return {
      id: '',  // backend will assign an ID for new quizzes
      content_id: '1',
      term_id: '1',
      quiz_title: '',
      description: '',
      time_limit: 0,
      is_published: false,
    };
  }
}
