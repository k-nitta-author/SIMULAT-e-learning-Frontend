import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService, Quiz } from '../../backend-services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {
  currentQuiz?: Quiz;
  error?: string;
  loading: boolean = true;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const quizId = this.route.snapshot.paramMap.get('id');
    if (quizId) {
      this.loadQuiz(quizId);
    }
  }

  private loadQuiz(id: string) {
    this.quizService.getQuizById(id).pipe(
      catchError(error => {
        this.error = `Failed to load quiz: ${error.message}`;
        this.loading = false;
        return of(undefined);
      })
    ).subscribe({
      next: (quiz) => {
        if (quiz) {
          this.currentQuiz = quiz;
        }
        this.loading = false;
      }
    });
  }
}
