import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../backend-services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import Student from '../../../general/interfaces/student';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  students: Student[] = []; // List of students
  isModalOpen = false; // Modal visibility
  isEditing = false; // Editing mode flag
  modalStudent: any = this.getEmptyStudent(); // Data for the modal
  sortColumn: string = 'name_last';
  sortDirection: 'asc' | 'desc' = 'asc';
  isAdmin: boolean = false;

  constructor(private studentService: StudentService) {
    const isAdmin = localStorage.getItem('is_admin');
    this.isAdmin = isAdmin === 'true';
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getAllStudents().subscribe(
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
      // Extract privileges data
      const privileges = {
        is_admin: this.modalStudent.is_admin,
        is_instructor: this.modalStudent.is_instructor,
        is_student: this.modalStudent.is_student,
        is_super_admin: this.modalStudent.is_super_admin
      };

      // First update privileges
      this.studentService.grantPrivileges(this.modalStudent.id.toString(), privileges).subscribe(
        () => {
          // Then update other user data
          this.studentService.updateStudent(this.modalStudent.id.toString(), this.modalStudent).subscribe(
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
        },
        err => console.error('Error updating privileges', err)
      );
    } else {
      this.studentService.createStudent(this.modalStudent).subscribe(
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
    this.studentService.deleteStudent(id.toString()).subscribe(
      () => {
        console.log('Student deleted successfully');
        this.students = this.students.filter(student => student.id !== id);
      },
      err => console.error('Error deleting student', err)
    );
  }

  // Sort function for the table
  sortStudents(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.students.sort((a: any, b: any) => {
      const compareValue = String(a[column]).localeCompare(String(b[column]));
      return this.sortDirection === 'asc' ? compareValue : -compareValue;
    });
  }

  // Get formatted date
  formatDate(date: string): string {
    return date ? new Date(date).toLocaleDateString() : 'N/A';
  }

  // Calculate age from date of birth
  calculateAge(dateOfBirth: string): number {
    if (!dateOfBirth) return 0;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  // Returns an empty student object for Add
  private getEmptyStudent() {
    return {
      id: 0,
      name_given: '',
      name_last: '',
      gender: '',
      email: '',
      username: '',
      progress_score: 0,
      is_admin: false,
      is_instructor: false,
      is_student: false,
      is_super_admin: false
    };
  }
}
