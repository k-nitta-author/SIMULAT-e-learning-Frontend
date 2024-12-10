import { Component, OnInit } from '@angular/core';
import { QuizService, Quiz } from '../../../services/quiz.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quizzes-list.component.html',
  styleUrls: ['./quizzes-list.component.css'],
})
export class QuizListComponent implements OnInit {
  quizzes: Quiz[] = [];
  selectedQuiz: Quiz | null = null;

  // Modal state and data
  isModalOpen = false;
  isEditing = false;
  modalQuiz: Quiz = this.getEmptyQuiz(); // Initialize with an empty quiz object

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.getQuizzes();
  }

  // Fetch all quizzes
  getQuizzes(): void {
    this.quizService.getAllQuizzes().subscribe(
      (data: Quiz[]) => {
        this.quizzes = data;
      },
      (error) => {
        console.error('Error fetching quizzes', error);
      }
    );
  }

  // Open the modal for adding/editing
  openModal(quiz?: Quiz): void {
    this.isModalOpen = true;
    if (quiz) {
      this.isEditing = true;
      this.modalQuiz = { ...quiz }; // Clone the quiz to avoid direct editing
    } else {
      this.isEditing = false;
      this.modalQuiz = this.getEmptyQuiz();
    }
  }

  // Close the modal
  closeModal(): void {
    this.isModalOpen = false;
    this.modalQuiz = this.getEmptyQuiz();
  }

  // Save the quiz (add or edit)
  saveQuiz(): void {
    if (this.isEditing) {
      // Update existing quiz
      this.quizService.updateQuiz(this.modalQuiz.quiz_id, this.modalQuiz).subscribe(
        (data: Quiz) => {
          const index = this.quizzes.findIndex(
            (quiz) => quiz.quiz_id === data.quiz_id
          );
          if (index !== -1) {
            this.quizzes[index] = data;
          }
          this.closeModal();
        },
        (error) => {
          console.error('Error updating quiz', error);
        }
      );
    } else {
      // Add new quiz
      this.quizService.addQuiz(this.modalQuiz).subscribe(
        (data: Quiz) => {
          this.quizzes.push(data);
          this.closeModal();
        },
        (error) => {
          console.error('Error adding quiz', error);
        }
      );
    }
  }

  // Delete a quiz
  deleteQuiz(quizId: string): void {
    this.quizService.deleteQuiz(quizId).subscribe(
      () => {
        this.quizzes = this.quizzes.filter((quiz) => quiz.quiz_id !== quizId);
      },
      (error) => {
        console.error('Error deleting quiz', error);
      }
    );
  }

  // Utility to get an empty quiz object
  private getEmptyQuiz(): Quiz {
    return {
      quiz_id: '', // Should be generated dynamically or assigned by the backend
      content_id: '',
      quiz_title: '',
      description: '',
      time_limit: 0,
      is_published: false,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}
