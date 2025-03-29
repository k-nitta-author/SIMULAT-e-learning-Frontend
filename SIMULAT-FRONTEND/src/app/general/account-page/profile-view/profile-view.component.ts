import { Component, Input } from '@angular/core';
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
export class ProfileViewComponent {
  @Input() userId: string = '';

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
}
