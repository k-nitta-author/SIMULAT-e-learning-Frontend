import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CoursesService } from '../../backend-services/courses.service';
import { Course } from '../../general/interfaces/course';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-details-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-details-page.component.html',
  styleUrls: ['./course-details-page.component.css']
})
export class CourseDetailsPageComponent implements OnInit {
  course?: Course;
  isInstructor: boolean = false;

  constructor(
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.isInstructor = localStorage.getItem('is_instructor') === 'true';
  }

  ngOnInit(): void {
    const courseId = this.activatedRoute.snapshot.paramMap.get('id');
    if (courseId) {
      this.coursesService.getCourseById(parseInt(courseId, 10)).subscribe({
        next: (course) => this.course = course,
        error: (error) => console.error('Error fetching course', error)
      });
    } else {
      console.error('Course ID is not available');
    }
  }

  onDeleteCourse(): void {
    if (this.course) {
      this.coursesService.deleteCourse(this.course.id).subscribe({
        next: () => this.router.navigate(['/student/courses']),
        error: (error) => console.error('Error deleting course', error)
      });
    } else {
      console.error('Course is not available');
    }
  }

  onPublishCourse(): void {
    if (this.course) {
      this.coursesService.publishCourse(this.course.id).subscribe({
        next: () => {
          if (this.course) {
            this.course.is_published = true;
          }
        },
        error: (error) => console.error('Error publishing course', error)
      });
    }
  }
}

