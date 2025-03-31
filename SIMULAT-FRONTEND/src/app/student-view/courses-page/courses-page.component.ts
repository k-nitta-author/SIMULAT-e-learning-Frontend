import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { DashItemComponent } from '../course_views/dash-item/dash-item.component';
import { NotificationsViewComponent } from '../../general/notifications-view/notifications-view.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CoursesService } from '../../backend-services/courses.service';
import { Course } from '../../general/interfaces/course';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule, DashItemComponent, NotificationsViewComponent, RouterLink, FormsModule],
  templateUrl: './courses-page.component.html',
  providers: [CoursesService],
  styleUrls: ['./courses-page.component.css']
})
export class CoursesPageComponent implements OnInit {
  courses: Course[] = [];
  isInstructor: boolean = false;
  editingCourse: number | null = null;
  editForm: Partial<Course> = {};

  constructor(private coursesService: CoursesService) {
    this.isInstructor = localStorage.getItem('is_instructor') === 'true';
  }

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses(): void {
    this.coursesService.getAllCourses().subscribe({
      next: (courses: Course[]) => {
        if (!this.isInstructor) {
          this.courses = courses.filter(course => course.is_published);
        } else {
          this.courses = courses;
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching courses', error);
      }
    });
  }

  publishCourse(courseId: number): void {
    this.coursesService.publishCourse(courseId).subscribe({
      next: () => {
        this.fetchCourses(); // Refresh the courses list after publishing
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error publishing course', error);
      }
    });
  }

  deleteCourse(courseId: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.coursesService.deleteCourse(courseId).subscribe({
        next: () => {
          this.fetchCourses(); // Refresh the courses list after deletion
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error deleting course', error);
        }
      });
    }
  }

  startEditing(course: Course): void {
    this.editingCourse = course.id;
    this.editForm = { ...course };
  }

  cancelEditing(): void {
    this.editingCourse = null;
    this.editForm = {};
  }

  saveEditing(courseId: number): void {
    if (this.editForm) {
      const updatedCourse: Course = {
        id: courseId,
        course_code: this.editForm.course_code || '',
        course_name: this.editForm.course_name || '',
        description: this.editForm.description || '',
        instructor: this.editForm.instructor || '',
        instructor_id: this.editForm.instructor_id || 0,
        term: this.editForm.term || 0,
        is_published: this.editForm.is_published || false,
        content_list: this.editForm.content_list || [],
        enrollments: this.editForm.enrollments || [],
        study_groups: this.editForm.study_groups || [],
        created_at: this.editForm.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      this.coursesService.updateCourse(courseId, updatedCourse).subscribe({
        next: () => {
          this.editingCourse = null;
          this.editForm = {};
          this.fetchCourses();
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error updating course', error);
        }
      });
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}