import { Component } from '@angular/core';

import { ProgressCircleComponent } from './progress-circle/progress-circle.component';

@Component({
  selector: 'app-class-dashboard-page',
  standalone: true,
  imports: [ProgressCircleComponent],
  templateUrl: './class-dashboard-page.component.html',
  styleUrl: './class-dashboard-page.component.css'
})
export class ClassDashboardPageComponent {

}
