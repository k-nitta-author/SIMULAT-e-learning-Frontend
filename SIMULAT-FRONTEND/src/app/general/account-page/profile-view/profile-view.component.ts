import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Student from '../../interfaces/student';
import { CourseProgress } from '../../interfaces/course-progress';
import { CoursesService } from '../../../backend-services/courses.service';
import { Course } from '../../interfaces/course';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterLink],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.css'
})
export class ProfileViewComponent implements OnChanges {
  @Input() userId: string = '';
  @Input() updatedUserData: Student | null = null;

  username: string = '';
  givenName: string = '';
  middleName: string = '';
  surname: string = '';
  gender: string = '';
  email: string = '';
  isAdmin: boolean = false;
  isInstructor: boolean = false;
  isStudent: boolean = false;
  isSuperAdmin: boolean = false;
  overallProgress: number = 0;  // renamed from progressScore
  progressScore: number = 0;
  roles: string[] = [];
  courseProgress: CourseProgress[] = [];
  totalMaxScore: number = 0;
  totalAchievedScore: number = 0;
  isLoading: boolean = true;
  taughtCourses: Course[] = [];
  allCourses: Course[] = [];

  constructor(
    private http: HttpClient,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.loadProfile();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['updatedUserData'] && changes['updatedUserData'].currentValue) {
      this.updateProfileData(changes['updatedUserData'].currentValue);
    } else if (changes['userId'] && changes['userId'].currentValue) {
      this.loadProfile();
    }
  }

  calculateOverallProgress(): number {
    if (!this.courseProgress.length) return 0;
    
    const totalMaxScore = this.courseProgress.reduce((sum, course) => sum + course.max_possible, 0);
    const totalScore = this.courseProgress.reduce((sum, course) => sum + course.total_score, 0);
    
    return totalMaxScore > 0 ? (totalScore / totalMaxScore) * 100 : 0;
  }

  calculateProgressScores(): void {
    if (!this.courseProgress.length) {
      this.totalMaxScore = 0;
      this.totalAchievedScore = 0;
      return;
    }
    
    this.totalMaxScore = this.courseProgress.reduce((sum, course) => sum + course.max_possible, 0);
    this.totalAchievedScore = this.courseProgress.reduce((sum, course) => sum + course.total_score, 0);
  }

  loadProfile() {
    this.isLoading = true;
    const url = 'https://simulat-e-learning-backend.onrender.com/user/' + this.userId;
    const token = localStorage.getItem('token');
    this.http.get<Student>(url, { headers: { 'Authorization': 'Bearer ' + token } }).subscribe(
      res => {
        console.log('Profile loaded', res);
        this.username = res.username;
        this.givenName = res.name_given;
        this.middleName = '';
        this.gender = res.gender;
        this.email = res.email;
        this.surname = res.name_last;
        this.isAdmin = res.is_admin;
        this.isInstructor = res.is_instructor;
        this.isStudent = res.is_student;
        this.isSuperAdmin = res.is_super_admin;
        this.overallProgress = res.overall_progress;
        this.progressScore = res.progress_score;
        this.courseProgress = res.is_student ? (res.course_progress || []) : [];
        this.calculateProgressScores();
        this.overallProgress = this.calculateOverallProgress();
        if (res.is_instructor) {
          this.loadInstructorCourses(parseInt(this.userId));
          this.loadAllCourses(); // Only load all courses if user is instructor
        }
        setTimeout(() => {
          this.isLoading = false;
        }, 300); // Short delay for smooth animation
      },
      err => {
        console.error('Profile load error', err);
        this.isLoading = false;
      }
    );
  }

  private updateProfileData(data: Student) {
    this.isLoading = true;
    this.username = data.username;
    this.givenName = data.name_given;
    this.middleName = '';
    this.gender = data.gender;
    this.email = data.email;
    this.surname = data.name_last;
    this.isAdmin = data.is_admin;
    this.isInstructor = data.is_instructor;
    this.isStudent = data.is_student;
    this.isSuperAdmin = data.is_super_admin;
    this.overallProgress = data.overall_progress;
    this.progressScore = data.progress_score;
    this.roles = [
      data.is_student ? 'Student' : '',
      data.is_instructor ? 'Instructor' : '',
      data.is_admin ? 'Admin' : '',
      data.is_super_admin ? 'Super Admin' : ''
    ].filter(role => role !== '');
    this.courseProgress = data.is_student ? (data.course_progress || []) : [];
    this.calculateProgressScores();
    this.overallProgress = this.calculateOverallProgress();
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
  }

  loadInstructorCourses(instructorId: number) {
    this.coursesService.getInstructorCourses(instructorId).subscribe({
      next: (courses) => {
        this.taughtCourses = courses;
      },
      error: (error) => console.error('Error loading instructor courses:', error)
    });
  }

  loadAllCourses() {
    this.coursesService.getAllCourses().subscribe({
      next: (courses) => {
        this.allCourses = courses;
      },
      error: (error) => console.error('Error loading courses:', error)
    });
  }

  getProgressColor(percentage: number): string {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-lime-500';
    if (percentage >= 40) return 'bg-yellow-500';
    if (percentage >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  }
}
