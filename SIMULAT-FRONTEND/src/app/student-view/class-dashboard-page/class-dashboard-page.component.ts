import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProgressCircleComponent } from './progress-circle/progress-circle.component';
import { DailyChallengeComponent } from './daily-challenge/daily-challenge.component';
import { CoursesService } from '../../backend-services/courses.service';
import { Course } from '../../general/interfaces/course';
import { EnrolledCourse } from '../../backend-services/courses.service';

@Component({
  selector: 'app-class-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ProgressCircleComponent, DailyChallengeComponent],
  templateUrl: './class-dashboard-page.component.html',
  styleUrl: './class-dashboard-page.component.css'
})
export class ClassDashboardPageComponent implements OnInit {
  enrolledCourses: EnrolledCourse[] = [];
  unenrolledCourses: Course[] = [];
  userId: number;

  constructor(private coursesService: CoursesService) {
    const storedUserId = localStorage.getItem('user_id');
    this.userId = storedUserId ? parseInt(storedUserId) : 1; // fallback to 1 if not found
    
    if (!storedUserId) {
      console.warn('User ID not found in local storage, using default value');
    }
  }

  ngOnInit() {
    this.loadEnrolledCourses();
    this.loadUnenrolledCourses();
  }

  loadEnrolledCourses() {
    this.coursesService.getEnrolledCourses(this.userId).subscribe({
      next: (courses) => {
        this.enrolledCourses = courses;
      },
      error: (error) => console.error('Error loading enrolled courses:', error)
    });
  }

  loadUnenrolledCourses() {
    this.coursesService.getNotEnrolledCourses(this.userId).subscribe({
      next: (courses) => this.unenrolledCourses = courses,
      error: (error) => console.error('Error loading unenrolled courses:', error)
    });
  }

  enrollInCourse(courseId: number) {
    this.coursesService.enrollInCourse(this.userId, courseId).subscribe({
      next: () => {
        this.loadEnrolledCourses();
        this.loadUnenrolledCourses();
      },
      error: (error) => console.error('Error enrolling in course:', error)
    });
  }

  calculateProgress(course: EnrolledCourse): number {
    return course.completion_percentage || 0;
  }
}
