import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

interface LoginResponse {
  privileges: {
    is_admin: boolean;
    is_instructor: boolean;
    is_student: boolean;
    is_super_admin: boolean;
  };
  token: string;
  user_id: number;
}

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const url = 'https://simulat-e-learning-backend.onrender.com/user/login';
    const authHeader = 'Basic ' + btoa(this.username + ':' + this.password);
    this.http.get<LoginResponse>(url, { headers: { 'Authorization': authHeader } }).subscribe(
      res => {
        console.log('Login successful', res);
        localStorage.setItem('token', res.token);
        localStorage.setItem('user_id', res.user_id.toString());
        
        // Store each privilege separately
        localStorage.setItem('is_admin', res.privileges.is_admin.toString());
        localStorage.setItem('is_instructor', res.privileges.is_instructor.toString());
        localStorage.setItem('is_student', res.privileges.is_student.toString());
        localStorage.setItem('is_super_admin', res.privileges.is_super_admin.toString());
        
        this.router.navigate(['/account']);
      },
      err => console.error('Login error', err)
    );
  }
}