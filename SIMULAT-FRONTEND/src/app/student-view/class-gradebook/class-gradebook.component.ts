import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../backend-services/student.service';
import { Student } from '../../backend-services/student.service';
import { GradebookTableViewComponent } from './gradebook-table-view/gradebook-table-view.component';
import { GradebookEntry, ScoresResponse } from '../../interfaces/gradebook.interface';

@Component({
  selector: 'app-class-gradebook',
  standalone: true,
  imports: [CommonModule, GradebookTableViewComponent],
  templateUrl: './class-gradebook.component.html',
  styleUrls: ['./class-gradebook.component.css']
})
export class ClassGradebookComponent implements OnInit {
  gradebookEntries: GradebookEntry[] = [];
  loading = true;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.loadGradebookData();
  }

  private loadGradebookData(): void {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      console.error('No user ID found in localStorage');
      return;
    }

    this.studentService.getStudentById(userId).subscribe(student => {
      if (student) {
        this.studentService.getStudentAllScores(userId).subscribe((scores: ScoresResponse) => {
          const entry: GradebookEntry = {
            studentId: student.id,
            studentName: `${student.name_given} ${student.name_last}`,
            scores: {
              assignments: scores.assignment_scores,
              quizzes: scores.quiz_scores,
              challenges: scores.challenge_scores
            },
            totalScore: this.calculateTotalScore(scores),
            averageScore: this.calculateAverageScore(scores),
            progress_score: student.progress_score || 0
          };
          this.gradebookEntries = [entry];
          this.loading = false;
        });
      }
    });
  }

  private calculateTotalScore(scores: ScoresResponse): number {
    const allScores = [
      ...scores.assignment_scores,
      ...scores.quiz_scores,
      ...scores.challenge_scores
    ];
    return Number(allScores.reduce((sum, item) => sum + item.score, 0).toFixed(2));
  }

  private calculateAverageScore(scores: ScoresResponse): number {
    const allScores = [
      ...scores.assignment_scores,
      ...scores.quiz_scores,
      ...scores.challenge_scores
    ];
    return allScores.length > 0 
      ? Number((allScores.reduce((sum, item) => sum + item.score, 0) / allScores.length).toFixed(2))
      : 0;
  }
}

