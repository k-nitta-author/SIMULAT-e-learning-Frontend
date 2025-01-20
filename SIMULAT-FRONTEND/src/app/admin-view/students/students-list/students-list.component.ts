import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  students: any[] = []; // List of students
  isModalOpen = false; // Modal visibility
  isEditing = false; // Editing mode flag
  modalStudent: any = this.getEmptyStudent(); // Data for the modal

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.getStudents();
  }

  // Placeholder data
  getStudents(): void {
    this.students = [
      {
        student_id: 'S001',
        given_name: 'Juan',
        middle_name: 'D.',
        surname: 'De la Cruz',
        date_of_birth: '2005-08-01',
        gender: 'Male',
        email: 'juand.delacruz@example.com',
        enrollment_date: '2023-09-01',
        username: 'juanddelacruz',
        password: 'password123',
        progress_score: 85,
      },
      {
        student_id: 'S002',
        given_name: 'Maria',
        middle_name: 'C.',
        surname: 'Reyes',
        date_of_birth: '2006-05-15',
        gender: 'Female',
        email: 'mariac.reyes@example.com',
        enrollment_date: '2023-09-01',
        username: 'mariacreyes',
        password: 'password123',
        progress_score: 90,
      },
    ];
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

  // Saves the student (Add or Edit)
  saveStudent(): void {
    if (this.isEditing) {
      // Update the student
      const index = this.students.findIndex(
        (s) => s.student_id === this.modalStudent.student_id
      );
      if (index !== -1) {
        this.students[index] = { ...this.modalStudent };
      }
    } else {
      // Add a new student
      this.students.push({ ...this.modalStudent });
    }
    this.closeModal();
  }

  // Deletes a student
  deleteStudent(id: string): void {
    this.students = this.students.filter((student) => student.student_id !== id);
  }

  // Returns an empty student object for Add
  private getEmptyStudent() {
    return {
      student_id: '',
      given_name: '',
      middle_name: '',
      surname: '',
      date_of_birth: '',
      gender: '',
      email: '',
      enrollment_date: '',
      username: '',
      password: '',
      progress_score: 0,
    };
  }
}
