import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressCircleComponent } from '../../class-dashboard-page/progress-circle/progress-circle.component';

@Component({
  selector: 'app-dash-item',
  standalone: true,
  imports: [ProgressCircleComponent],
  templateUrl: './dash-item.component.html',
  styleUrls: ['./dash-item.component.css']
})
export class DashItemComponent {
  @Input() courseTitle!: string;
  @Input() courseCode!: number;
  @Input() courseDescription!: string;

  constructor(private router: Router) {}

  navigateToCourseDetails(): void {
    this.router.navigate(['/course-details', this.courseCode]);
  }
}
