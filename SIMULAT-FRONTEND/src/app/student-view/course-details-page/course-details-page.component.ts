import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../backend-services/courses.service';
import { Course } from '../../general/interfaces/course';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
>>>>>>> Stashed changes

@Component({
  selector: 'app-course-details-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-details-page.component.html',
  styleUrls: ['./course-details-page.component.css']
})
export class CourseDetailsPageComponent implements OnInit {
  course: Course = {
    content_list: [
      { id: 1, title: 'asd aksdj sadh', url: 'asdkasjd kajsd' }
    ],
    course_code: 'AAA',
    course_name: 'EWQ WRE',
    created_at: 'Tue, 04 Mar 2025 00:00:00 GMT',
    description: 'sadasd skajhd kajshdkj asdh',
    enrollments: [
      { course_id: 1, enroll_date: 'Tue, 04 Mar 2025 00:00:00 GMT', user_id: 3 }
    ],
    id: 1,
    instructor: 'John teacherman',
    instructor_id: 2,
    is_published: false,
    study_groups: [],
    term: 1,
    updated_at: 'Tue, 04 Mar 2025 00:00:00 GMT'
  };

  constructor(
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

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
}

  imports: [],
  templateUrl: './course-details-page.component.html',
  styleUrl: './course-details-page.component.css'
})
export class CourseDetailsPageComponent {

  

}
