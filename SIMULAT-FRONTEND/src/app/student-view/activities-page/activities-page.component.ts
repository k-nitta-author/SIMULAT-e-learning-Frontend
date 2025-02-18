import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesTableComponent } from './activities-table/activities-table.component';

@Component({
  selector: 'app-activities-page',
  standalone: true,
  imports: [CommonModule, ActivitiesTableComponent],
  templateUrl: './activities-page.component.html',
  styleUrls: ['./activities-page.component.css']
})
export class ActivitiesPageComponent {}
