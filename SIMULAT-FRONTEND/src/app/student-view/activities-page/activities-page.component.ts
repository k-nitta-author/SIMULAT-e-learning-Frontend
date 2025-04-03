import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { ActivitiesTableComponent } from './activities-table/activities-table.component';
import { ActivitiesService, ActivitiesData } from '../../general/services/activities.service';
import { CoursesService } from '../../backend-services/courses.service';

interface CombinedActivity {
  id: number;
  title: string;
  score: number;
  type: 'quiz' | 'challenge' | 'assignment';
  status: 'completed' | 'pending';
}

@Component({
  selector: 'app-activities-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ActivitiesTableComponent, RouterModule],
  templateUrl: './activities-page.component.html',
  styleUrls: ['./activities-page.component.css']
})
export class ActivitiesPageComponent implements OnInit {
  activitiesData: ActivitiesData | null = null;
  error: string | null = null;
  combinedActivities: CombinedActivity[] = [];

  constructor(
    private activitiesService: ActivitiesService,
    private coursesService: CoursesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activitiesService.getActivities().subscribe({
      next: (data) => {
        this.activitiesData = data;
        this.combineActivities();
      },
      error: (err) => {
        console.error('Failed to load activities', err);
        this.error = 'Failed to load activities. Please try again later.';
      }
    });
  }

  private combineActivities() {
    if (!this.activitiesData) return;

    const mapActivity = (a: any, type: 'assignment' | 'challenge' | 'quiz', isCompleted: boolean) => ({
      ...a,
      type,
      status: isCompleted ? 'completed' as const : 'pending' as const
    });

    this.combinedActivities = [
      ...this.activitiesData.assignments.completed.map(a => mapActivity(a, 'assignment', true)),
      ...this.activitiesData.assignments.pending.map(a => mapActivity(a, 'assignment', false)),
      ...this.activitiesData.challenges.completed.map(a => mapActivity(a, 'challenge', true)),
      ...this.activitiesData.challenges.pending.map(a => mapActivity(a, 'challenge', false)),
      ...this.activitiesData.quizzes.completed.map(a => mapActivity(a, 'quiz', true)),
      ...this.activitiesData.quizzes.pending.map(a => mapActivity(a, 'quiz', false))
    ];
  }

  completeActivity(activity: CombinedActivity) {
    const userId = Number(localStorage.getItem('user_id')) || 1;
    const courseId = 1; // You might need to add courseId to your activity interface and data

    switch (activity.type) {
      case 'quiz':
        this.coursesService.completeQuiz(courseId, activity.id, userId).subscribe({
          next: () => this.refreshActivities(),
          error: (err) => {
            console.error('Failed to complete quiz', err);
            this.error = 'Failed to complete activity. Please try again later.';
          }
        });
        break;
      case 'assignment':
        this.coursesService.completeAssignment(courseId, activity.id, userId).subscribe({
          next: () => this.refreshActivities(),
          error: (err) => {
            console.error('Failed to complete assignment', err);
            this.error = 'Failed to complete activity. Please try again later.';
          }
        });
        break;
      case 'challenge':
        this.coursesService.completeChallenge(courseId, activity.id, userId).subscribe({
          next: () => this.refreshActivities(),
          error: (err) => {
            console.error('Failed to complete challenge', err);
            this.error = 'Failed to complete activity. Please try again later.';
          }
        });
        break;
    }
  }

  private refreshActivities() {
    this.ngOnInit();
  }

  navigateToDetail(activity: CombinedActivity) {
    switch (activity.type) {
      case 'quiz':
        this.router.navigate(['/quiz', activity.id]);
        break;
      case 'assignment':
        this.router.navigate(['/assignment', activity.id]);
        break;
      case 'challenge':
        this.router.navigate(['/challenge-detail', activity.id]);
        break;
    }
  }
}
