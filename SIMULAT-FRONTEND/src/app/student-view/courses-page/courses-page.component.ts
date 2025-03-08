import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DashItemComponent } from '../course_views/dash-item/dash-item.component';
import { NotificationsViewComponent } from '../../general/notifications-view/notifications-view.component';
import { Course } from '../../general/interfaces/course';
import { CoursesService } from '../../backend-services/courses.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule, DashItemComponent, NotificationsViewComponent, RouterLink],
  templateUrl: './courses-page.component.html',
  providers: [CoursesService],
  styleUrls: ['./courses-page.component.css']
})
export class CoursesPageComponent implements OnInit {
  courses: Course[] = [];

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses(): void {
    this.coursesService.getAllCourses().subscribe({
      next: (courses: Course[]) => {
        this.courses = courses;
      },
      error: (error) => {
        console.error('Error fetching courses', error);
      }
    });
  }
}