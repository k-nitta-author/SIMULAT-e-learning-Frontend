import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InstructorService, Instructor } from '../../../backend-services/instructor.service';

@Component({
  selector: 'app-instructors-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './instructors-list.component.html',
  styleUrls: ['./instructors-list.component.css']
})
export class InstructorsListComponent implements OnInit {
  instructors: Instructor[] = [];
  isModalOpen: boolean = false;

  // Model for new instructor
  newInstructor: Instructor = {
    instructor_id: '',
    name: '',
    email: '',
    department: '',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  };

  constructor(private instructorService: InstructorService) {}

  ngOnInit(): void {
    this.getInstructors();
  }

  getInstructors(): void {
    this.instructorService.getAllInstructors().subscribe(instructors => {
      this.instructors = instructors;
    });
  }

  editInstructor(id: string): void {
    const instructorToEdit = this.instructors.find(instructor => instructor.instructor_id === id);
    if (instructorToEdit) {
      this.newInstructor = { ...instructorToEdit };
      this.isModalOpen = true;
    }
  }

  deleteInstructor(id: string): void {
    this.instructorService.deleteInstructor(id).subscribe(() => {
      this.getInstructors();
    });
  }

  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
    if (!this.isModalOpen) {
      this.resetForm();
    }
  }

  onSubmit(): void {
    if (!this.newInstructor.name || !this.newInstructor.email) {
      alert('Please fill out all required fields.');
      return;
    }

    if (!this.newInstructor.instructor_id) {
      // Add new instructor
      this.newInstructor.instructor_id = (this.instructors.length + 1).toString(); // Placeholder logic
      this.instructorService.addInstructor(this.newInstructor).subscribe(addedInstructor => {
        this.instructors.push(addedInstructor);
        this.toggleModal();
      });
    } else {
      // Update existing instructor
      this.instructorService.updateInstructor(this.newInstructor).subscribe(() => {
        this.getInstructors();
        this.toggleModal();
      });
    }
  }

  resetForm(): void {
    this.newInstructor = {
      instructor_id: '',
      name: '',
      email: '',
      department: '',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}
