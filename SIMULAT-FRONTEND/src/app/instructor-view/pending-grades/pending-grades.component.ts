import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CoursesService } from '../../backend-services/courses.service';

interface Score {
  student_id: number;
  score: number;
  submission_date: string;
  pending: boolean;
}

interface ScoredItem {
  id: number;
  title: string;
  deadline?: string | null;
  scores: Score[];
}

interface AllScores {
  assignments: ScoredItem[];
  quizzes: ScoredItem[];
  challenges: ScoredItem[];
}

@Component({
  selector: 'app-pending-grades',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './pending-grades.component.html',
  styleUrl: './pending-grades.component.css'
})
export class PendingGradesComponent implements OnInit {
  activeTab = 'assignments';
  allScores: AllScores = {
    assignments: [],
    quizzes: [],
    challenges: []
  };
  selectedCourseId!: number;
  gradeInputs: { [key: string]: number } = {};
  editMode: { [key: string]: boolean } = {};

  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedCourseId = +params['id'];
      this.loadAllScores();
    });
  }

  loadAllScores() {
    this.coursesService.getAllScores(this.selectedCourseId)
      .subscribe({
        next: (data: AllScores) => {
          // Transform scores to mark pending status
          data.assignments.forEach(assignment => {
            assignment.scores.forEach(score => {
              score.pending = score.score === -1;
            });
          });
          data.quizzes.forEach(quiz => {
            quiz.scores.forEach(score => {
              score.pending = score.score === -1;
            });
          });
          data.challenges.forEach(challenge => {
            challenge.scores.forEach(score => {
              score.pending = score.score === -1;
            });
          });
          this.allScores = data;
        },
        error: (error) => {
          console.error('Error loading scores:', error);
        }
      });
  }

  submitQuizGrade(quizId: number, studentId: number) {
    const inputKey = `quiz-${quizId}-${studentId}`;
    if (this.gradeInputs[inputKey]) {
      this.coursesService.gradeQuiz(
        this.selectedCourseId,
        quizId,
        studentId,
        this.gradeInputs[inputKey]
      ).subscribe({
        next: () => this.loadAllScores(),
        error: (error) => console.error('Error grading quiz:', error)
      });
    }
  }

  submitAssignmentGrade(assignmentId: number, studentId: number) {
    const inputKey = `assignment-${assignmentId}-${studentId}`;
    if (this.gradeInputs[inputKey]) {
      this.coursesService.gradeAssignment(
        this.selectedCourseId,
        assignmentId,
        studentId,
        this.gradeInputs[inputKey]
      ).subscribe({
        next: () => this.loadAllScores(),
        error: (error) => console.error('Error grading assignment:', error)
      });
    }
  }

  submitChallengeGrade(challengeId: number, studentId: number) {
    const inputKey = `challenge-${challengeId}-${studentId}`;
    if (this.gradeInputs[inputKey]) {
      this.coursesService.gradeChallenge(
        this.selectedCourseId,
        challengeId,
        studentId,
        this.gradeInputs[inputKey]
      ).subscribe({
        next: () => this.loadAllScores(),
        error: (error) => console.error('Error grading challenge:', error)
      });
    }
  }

  editGrade(itemId: number, studentId: number, type: 'quiz' | 'assignment' | 'challenge') {
    const key = `${type}-${itemId}-${studentId}`;
    this.editMode[key] = true;
    let currentScore: number | undefined;

    switch (type) {
      case 'quiz':
        currentScore = this.allScores.quizzes
          .find((item: ScoredItem) => item.id === itemId)
          ?.scores.find((score: Score) => score.student_id === studentId)?.score;
        break;
      case 'assignment':
        currentScore = this.allScores.assignments
          .find((item: ScoredItem) => item.id === itemId)
          ?.scores.find((score: Score) => score.student_id === studentId)?.score;
        break;
      case 'challenge':
        currentScore = this.allScores.challenges
          .find((item: ScoredItem) => item.id === itemId)
          ?.scores.find((score: Score) => score.student_id === studentId)?.score;
        break;
    }
    
    this.gradeInputs[key] = currentScore ?? 0;
  }

  submitGrade(itemId: number, studentId: number, type: 'quiz' | 'assignment' | 'challenge') {
    const key = `${type}-${itemId}-${studentId}`;
    
    switch (type) {
      case 'quiz':
        this.submitQuizGrade(itemId, studentId);
        break;
      case 'assignment':
        this.submitAssignmentGrade(itemId, studentId);
        break;
      case 'challenge':
        this.submitChallengeGrade(itemId, studentId);
        break;
    }

    this.editMode[key] = false;
  }

  cancelEdit(itemId: number, studentId: number, type: 'quiz' | 'assignment' | 'challenge') {
    const key = `${type}-${itemId}-${studentId}`;
    delete this.gradeInputs[key];
    this.editMode[key] = false;
  }
}
