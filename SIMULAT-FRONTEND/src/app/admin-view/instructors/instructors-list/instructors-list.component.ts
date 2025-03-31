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

  constructor(private instructorService: InstructorService) {}

  ngOnInit(): void {
    this.getInstructors();
  }

  getInstructors(): void {
    this.instructorService.getAllInstructors().subscribe(instructors => {
      this.instructors = instructors;
    });
  }

  deleteInstructor(id: string): void {
    if (confirm('Are you sure you want to delete this instructor?')) {
      this.instructorService.deleteInstructor(id).subscribe(() => {
        this.getInstructors();
      });
    }
  }
}
