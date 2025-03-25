import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivitiesTableComponent } from './activities-table/activities-table.component';
import { ActivitiesService, ActivitiesData } from '../../general/services/activities.service';

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
  imports: [CommonModule, HttpClientModule, ActivitiesTableComponent],
  templateUrl: './activities-page.component.html',
  styleUrls: ['./activities-page.component.css']
})
export class ActivitiesPageComponent implements OnInit {
  activitiesData: ActivitiesData | null = null;
  error: string | null = null;
  combinedActivities: CombinedActivity[] = [];

  constructor(private activitiesService: ActivitiesService) {}

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

    this.combinedActivities = [
      ...this.activitiesData.assignments.completed.map(a => ({...a, type: 'assignment' as const, status: 'completed' as const})),
      ...this.activitiesData.assignments.pending.map(a => ({...a, type: 'assignment' as const, status: 'pending' as const})),
      ...this.activitiesData.challenges.completed.map(a => ({...a, type: 'challenge' as const, status: 'completed' as const})),
      ...this.activitiesData.challenges.pending.map(a => ({...a, type: 'challenge' as const, status: 'pending' as const})),
      ...this.activitiesData.quizzes.completed.map(a => ({...a, type: 'quiz' as const, status: 'completed' as const})),
      ...this.activitiesData.quizzes.pending.map(a => ({...a, type: 'quiz' as const, status: 'pending' as const}))
    ];
  }

  completeActivity(activity: CombinedActivity) {
    // TODO: Implement API call to complete activity
    console.log(`Completing activity: ${activity.id}`);
  }
}
