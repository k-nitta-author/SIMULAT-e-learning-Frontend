import { Component } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { quiz } from '../../../general/interfaces/quiz';

@Component({
  selector: 'app-quiz-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './quiz-detail.component.html',
  styleUrl: './quiz-detail.component.css'
})
export class QuizDetailComponent {

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

  constructor(private http: HttpClient){



  }


  
}
