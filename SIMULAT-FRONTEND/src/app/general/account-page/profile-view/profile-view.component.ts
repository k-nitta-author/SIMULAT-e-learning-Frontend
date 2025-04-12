import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Student from '../../interfaces/student';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
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
  progressScore: number = 0;

  constructor(private http: HttpClient) {}

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

  loadProfile() {
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
        this.progressScore = res.progress_score;
      },
      err => console.error('Profile load error', err)
    );
  }

  private updateProfileData(data: Student) {
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
    this.progressScore = data.progress_score;
  }
}
