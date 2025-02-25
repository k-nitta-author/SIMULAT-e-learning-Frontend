import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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
    this.http.get<{ token: string, user_id: number }>(url, { headers: { 'Authorization': authHeader } }).subscribe(
      res => {
        console.log('Login successful', res);
        localStorage.setItem('token', res.token);
        localStorage.setItem('user_id', res.user_id.toString());
        this.router.navigate(['/account']);
      },
      err => console.error('Login error', err)
    );
  }
}