import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoursesService } from '../../backend-services/courses.service';

interface PendingScores {
  pending_assignments: PendingItem[];
  pending_quizzes: PendingItem[];
  pending_challenges: PendingItem[];
}

interface PendingItem {
  id: number;
  title: string;
  deadline?: string;
}

@Component({
  selector: 'app-pending-grades',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './pending-grades.component.html',
  styleUrl: './pending-grades.component.css'
})
export class PendingGradesComponent implements OnInit {
  activeTab = 'assignments';
  pendingScores: PendingScores = {
    pending_assignments: [],
    pending_quizzes: [],
    pending_challenges: []
  };
  selectedCourseId = 1; // Replace with actual course ID
  selectedUserId = 1;   // Replace with actual user ID
  gradeInputs: { [key: string]: number } = {};

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.loadPendingScores();
  }

  loadPendingScores() {
    this.coursesService.getPendingScores(this.selectedCourseId, this.selectedUserId)
      .subscribe({
        next: (data: PendingScores) => {
          this.pendingScores = data;
        },
        error: (error) => {
          console.error('Error loading pending scores:', error);
        }
      });
  }

  submitQuizGrade(quizId: number) {
    if (this.gradeInputs[`quiz-${quizId}`]) {
      this.coursesService.gradeQuiz(
        this.selectedCourseId,
        quizId,
        this.selectedUserId,
        this.gradeInputs[`quiz-${quizId}`]
      ).subscribe({
        next: () => this.loadPendingScores(),
        error: (error) => console.error('Error grading quiz:', error)
      });
    }
  }

  submitAssignmentGrade(assignmentId: number) {
    if (this.gradeInputs[`assignment-${assignmentId}`]) {
      this.coursesService.gradeAssignment(
        this.selectedCourseId,
        assignmentId,
        this.selectedUserId,
        this.gradeInputs[`assignment-${assignmentId}`]
      ).subscribe({
        next: () => this.loadPendingScores(),
        error: (error) => console.error('Error grading assignment:', error)
      });
    }
  }

  submitChallengeGrade(challengeId: number) {
    if (this.gradeInputs[`challenge-${challengeId}`]) {
      this.coursesService.gradeChallenge(
        this.selectedCourseId,
        challengeId,
        this.selectedUserId,
        this.gradeInputs[`challenge-${challengeId}`]
      ).subscribe({
        next: () => this.loadPendingScores(),
        error: (error) => console.error('Error grading challenge:', error)
      });
    }
  }
}
