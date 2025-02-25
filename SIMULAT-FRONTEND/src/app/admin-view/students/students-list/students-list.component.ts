import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../backend-services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Student from '../../../general/interfaces/student';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  students: Student[] = []; // List of students
  isModalOpen = false; // Modal visibility
  isEditing = false; // Editing mode flag
  modalStudent: any = this.getEmptyStudent(); // Data for the modal

  constructor(private studentService: StudentService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getStudents();
    this.loadStudents();
  }

  // Placeholder data
  getStudents(): void {

  }

  loadStudents() {
    const url = 'https://simulat-e-learning-backend.onrender.com/user';
    this.http.get<Student[]>(url).subscribe(
      res => {
        console.log('Students loaded', res);
        this.students = res;
      },
      err => console.error('Error loading students', err)
    );
  }

  // Opens the modal for Add or Edit
  openModal(student?: any): void {
    this.isEditing = !!student; // If student exists, it's Edit mode
    this.modalStudent = student ? { ...student } : this.getEmptyStudent();
    this.isModalOpen = true;
  }

  // Closes the modal
  closeModal(): void {
    this.isModalOpen = false;
  }

  // Saves the student (Add or Edit) by sending a POST or PUT request as appropriate
  saveStudent(): void {
    if (this.isEditing) {
      // PUT request for updating an existing student
      const url = `https://simulat-e-learning-backend.onrender.com/user/${this.modalStudent.id}`;
      this.http.put<Student>(url, this.modalStudent).subscribe(
        res => {
          console.log('Student updated', res);
          const index = this.students.findIndex(s => s.id === res.id);
          if (index !== -1) {
            this.students[index] = res;
          }
          this.closeModal();
        },
        err => console.error('Error updating student', err)
      );
    } else {
      // POST request for adding a new student
      console.log('Sending student data:', this.modalStudent);
      this.http.post<Student>('https://simulat-e-learning-backend.onrender.com/user', this.modalStudent)
        .subscribe(
          res => {
            console.log('Student saved', res);
            this.students.push(res);
            this.closeModal();
          },
          err => console.error('Error saving student', err)
        );
    }
  }

  // Deletes a student by sending a DELETE request
  deleteStudent(id: number): void {
    const url = `https://simulat-e-learning-backend.onrender.com/user/${id}`;
    this.http.delete(url).subscribe(
      () => {
        console.log('Student deleted successfully');
        this.students = this.students.filter(student => student.id !== id);
      },
      err => console.error('Error deleting student', err)
    );
  }

  // Returns an empty student object for Add
  private getEmptyStudent(){
    return {
      id: '',
      name_given: '',
      name_last: '',
      date_of_birth: '',
      gender: '',
      email: '',
      enrollment_date: '',
      username: '',
      password: '',
      progress_score: 0,
      is_admin: true,
      is_instructor: false,
      is_student: false,
      is_super_admin: false
    };
  }
}
