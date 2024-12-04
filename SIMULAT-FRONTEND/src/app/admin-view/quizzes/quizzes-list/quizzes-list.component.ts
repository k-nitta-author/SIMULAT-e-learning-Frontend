import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { CommonModule } from '@angular/common';

// placeholder model until connected to backend
interface Quiz {
  quiz_id: string;
  content_id: string;
  quiz_title: string;
  description: string;
  time_limit: number;
  is_published: boolean;
  created_at: Date;
  updated_at: Date;
}

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizzes-list.component.html',
  styleUrls: ['./quizzes-list.component.css']
})
export class QuizListComponent implements OnInit {

  quizzes: Quiz[] = [];   // Array to store the list of quizzes
  selectedQuiz: Quiz | null = null;  // Store the selected quiz for editing

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.getQuizzes();  // Fetch quizzes when the component initializes
  }

  // Fetch all quizzes from the service
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

  // Handle the selection of a quiz for editing
  selectQuiz(quiz: Quiz): void {
    this.selectedQuiz = quiz;
  }

  // Handle adding a new quiz
  addQuiz(newQuiz: Quiz): void {
    this.quizService.addQuiz(newQuiz).subscribe(
      (data: Quiz) => {
        this.quizzes.push(data);  // Add the newly created quiz to the list
      },
      (error) => {
        console.error('Error adding quiz', error);
      }
    );
  }

  // Handle updating an existing quiz
  updateQuiz(updatedQuiz: Quiz): void {
    if (!this.selectedQuiz) return;  // Ensure a quiz is selected for updating

    this.quizService.updateQuiz(this.selectedQuiz.quiz_id, updatedQuiz).subscribe(
      (data: Quiz) => {
        const index = this.quizzes.findIndex(quiz => quiz.quiz_id === data.quiz_id);
        if (index !== -1) {
          this.quizzes[index] = data;  // Update the quiz in the list
        }
      },
      (error) => {
        console.error('Error updating quiz', error);
      }
    );
  }

  // Handle deleting a quiz
  deleteQuiz(quizId: string): void {
    this.quizService.deleteQuiz(quizId).subscribe(
      () => {
        this.quizzes = this.quizzes.filter(quiz => quiz.quiz_id !== quizId);  // Remove the deleted quiz from the list
      },
      (error) => {
        console.error('Error deleting quiz', error);
      }
    );
  }
}
