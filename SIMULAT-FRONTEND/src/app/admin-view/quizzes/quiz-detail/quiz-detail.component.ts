import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { quiz } from '../../../general/interfaces/quiz';
import { QuizService } from '../../../backend-services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-quiz-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './quiz-detail.component.html',
  styleUrl: './quiz-detail.component.css'
})
export class QuizDetailComponent implements OnInit {
  quiz: quiz = {
    id: 0,
    content_id: 0,
    description: '',
    is_published: false,
    grade: '',
    quiz_title: '',
    time_limit: 0,
    status: ''
  }
  
  error: string = '';
  loading: boolean = true;

  constructor(
    private http: HttpClient, 
    private quizService: QuizService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadQuizData();
  }

  loadQuizData() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.quizService.getQuizById(id).pipe(
        catchError(error => {
          this.error = `Failed to load quiz: ${error.message}`;
          this.loading = false;
          return of(undefined);
        })
      ).subscribe({
        next: (quizData) => {
          if (quizData) {
            // Convert Quiz service interface to component quiz interface
            this.quiz = {
              id: parseInt(quizData.quiz_id),
              content_id: parseInt(quizData.content_id),
              description: quizData.description,
              is_published: quizData.is_published,
              grade: '',  // Set default or get from service if needed
              quiz_title: quizData.quiz_title,
              time_limit: quizData.time_limit,
              status: quizData.is_published ? 'Published' : 'Not Published'
            };
          }
          this.loading = false;
        }
      });
    }
  }

  togglePublish() {
    this.quiz.is_published = !this.quiz.is_published;
    this.quizService.updateQuiz(this.quiz.id.toString(), {
      quiz_id: this.quiz.id.toString(),
      content_id: this.quiz.content_id.toString(),
      quiz_title: this.quiz.quiz_title,
      description: this.quiz.description,
      time_limit: this.quiz.time_limit,
      is_published: this.quiz.is_published,
      created_at: new Date(),
      updated_at: new Date()
    }).pipe(
      catchError(error => {
        this.error = `Failed to update quiz: ${error.message}`;
        return of(undefined);
      })
    ).subscribe(() => {
      // Success handling
      this.error = '';
    });
  }
}
