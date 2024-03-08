import { Component } from '@angular/core';

import { ProgressCircleComponent } from './progress-circle/progress-circle.component';
import { DailyChallengeComponent } from './daily-challenge/daily-challenge.component';



@Component({
  selector: 'app-class-dashboard-page',
  standalone: true,
  imports: [ProgressCircleComponent, DailyChallengeComponent],
  templateUrl: './class-dashboard-page.component.html',
  styleUrl: './class-dashboard-page.component.css'
})
export class ClassDashboardPageComponent {

  // testing data below; delete when complete with json testing

  //courses_list: Object[]=



}
