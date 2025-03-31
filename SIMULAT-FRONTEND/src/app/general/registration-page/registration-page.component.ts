import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StudentService, Student } from '../../backend-services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent {
  formData: Student = {
    id: 0,
    username: '',
    password: '',
    email: '',
    name_given: '',
    name_last: '',
    gender: '',
    is_admin: false,
    is_instructor: false,
    is_student: true,
    is_super_admin: false,
    progress_score: 0
  };

  registrationSuccess = false;

  constructor(private studentService: StudentService, private router: Router) {}

  onSubmit(): void {
    this.studentService.createStudent(this.formData)
      .subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.registrationSuccess = true;
        },
        error: (error) => {
          console.error('Error during registration', error);
          // Handle registration error
        }
      });
  }

  handleModalClick(): void {
    if (this.registrationSuccess) {
      this.registrationSuccess = false;
      this.router.navigate(['/home']);
    }
  }
}
