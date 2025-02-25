import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent {
  formData = {
    username: '',
    password: '',
    email: '',
    name_given: '',
    name_last: '',
    gender: '',
    is_admin: false,
    is_instructor: false,
    is_student: true,
    is_super_admin: false
  };

  constructor(private http: HttpClient) {}

  onSubmit(): void {
    // API endpoint to send the form data
    const apiUrl = 'https://api.example.com/register';

    this.http.post(apiUrl, this.formData)
      .subscribe(response => {
        console.log('Registration successful', response);
        // Handle successful registration
      }, error => {
        console.error('Error during registration', error);
        // Handle registration error
      });
  }
}
