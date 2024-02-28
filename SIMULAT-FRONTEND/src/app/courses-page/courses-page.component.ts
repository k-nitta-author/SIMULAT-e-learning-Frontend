import { Component } from '@angular/core';
import { DashItemComponent } from '../course_views/dash-item/dash-item.component';


@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [DashItemComponent],
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.css'
})
export class CoursesPageComponent {

}
