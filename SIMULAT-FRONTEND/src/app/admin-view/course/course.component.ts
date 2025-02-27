import { Component, OnInit } from '@angular/core';
import { Course } from '../../general/interfaces/course';
import { CoursesService } from '../../backend-services/courses.service';
import { NgFor, NgIf, DatePipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, CommonModule, FormsModule],
  templateUrl: './course.component.html',
  providers: [CoursesService],
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courses: Course[] = [];
  isModalOpen: boolean = false;
  newCourse: Partial<Course> = {};

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.coursesService.getAllCourses().subscribe({
      next: (courses: Course[]) => {
        this.courses = courses;
      },
      error: (error) => {
        console.error('Error loading courses:', error);
      }
    });
  }

  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
    if (!this.isModalOpen) {
      this.newCourse = {};
    }
  }

  onSubmit(): void {
    if (!this.newCourse.course_name || !this.newCourse.description) {
      alert('Please fill out all required fields.');
      return;
    }

    if (this.newCourse.id) {
      this.coursesService.updateCourse(this.newCourse.id, this.newCourse as Course)
        .subscribe({
          next: (updatedCourse) => {
            if (updatedCourse) {
              const index = this.courses.findIndex(course => course.id === updatedCourse.id);
              if (index !== -1) {
                this.courses[index] = updatedCourse;
                this.toggleModal();
              }
            }
          },
          error: (error) => {
            console.error('Error updating course:', error);
          }
        });
    } else {
      this.coursesService.addCourse(this.newCourse as Course)
        .subscribe({
          next: (addedCourse) => {
            this.courses.push(addedCourse);
            this.toggleModal();
          },
          error: (error) => {
            console.error('Error adding course:', error);
          }
        });
    }
  }

  editCourse(id: number): void {
    const courseToEdit = this.courses.find(course => course.id === id);
    if (courseToEdit) {
      this.newCourse = { ...courseToEdit };
      this.isModalOpen = true;
    }
  }

  deleteCourse(id: number): void {
    this.coursesService.deleteCourse(id).subscribe({
      next: () => {
        this.courses = this.courses.filter(course => course.id !== id);
      },
      error: (error) => {
        console.error('Error deleting course:', error);
      }
    });
  }
}
