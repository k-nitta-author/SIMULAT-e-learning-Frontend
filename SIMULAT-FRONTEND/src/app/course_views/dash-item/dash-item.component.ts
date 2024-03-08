import { Component } from '@angular/core';

import { ProgressCircleComponent } from '../../class-dashboard-page/progress-circle/progress-circle.component';

@Component({
  selector: 'app-dash-item',
  standalone: true,
  imports: [ProgressCircleComponent],
  templateUrl: './dash-item.component.html',
  styleUrl: './dash-item.component.css'
})
export class DashItemComponent {

}
