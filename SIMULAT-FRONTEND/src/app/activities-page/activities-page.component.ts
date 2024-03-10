import { Component } from '@angular/core';

import { ActivitiesTableComponent } from './activities-table/activities-table.component';


@Component({
  selector: 'app-activities-page',
  standalone: true,
  imports: [ActivitiesTableComponent],
  templateUrl: './activities-page.component.html',
  styleUrl: './activities-page.component.css'
})
export class ActivitiesPageComponent {

}
