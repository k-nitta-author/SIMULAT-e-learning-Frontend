import { Component, OnInit } from '@angular/core';
import { Assignment, AssignmentService } from '../../../services/assignment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assignments-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assignments-list.component.html',
})
export class AssignmentsListComponent implements OnInit {
  assignments: Assignment[] = [];
  isModalOpen: boolean = false; // Track modal visibility

  // Model for new assignment
  newAssignment: Assignment = {
    assignment_id: '',
    content_id: 'C00X', // Default or placeholder content ID
    assignment_title: '',
    description: '',
    deadline: null,
    max_score: 0,
    file_url: '',
    grading_criteria: '',
    instructions: '',
    submission_format: '',
    is_published: false,
    created_at: new Date(),
    updated_at: new Date(),
  };

  constructor(private assignmentService: AssignmentService) {}

  ngOnInit(): void {
    this.getAssignments();
  }

  getAssignments(): void {
    this.assignmentService.getAllAssignments().subscribe(assignments => {
      this.assignments = assignments.map(assignment => ({
        ...assignment,
        deadline: assignment.deadline ? new Date(assignment.deadline) : null
      }));
    });
  }

  editAssignment(id: string): void {
    // Navigate to edit page/modal(?)
  }

  deleteAssignment(id: string): void {
    this.assignmentService.deleteAssignment(id).subscribe(() => {
      this.getAssignments(); // Refresh list
    });
  }

  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
    if (!this.isModalOpen) {
      // Reset the form when closing the modal
      this.resetForm();
    }
  }

  onSubmit(): void {
    if (!this.newAssignment.assignment_title || !this.newAssignment.description) {
      alert('Please fill out all required fields.');
      return;
    }

    // Assign a unique ID (placeholder logic)
    this.newAssignment.assignment_id = (this.assignments.length + 1).toString();

    this.assignmentService.addAssignment(this.newAssignment).subscribe(addedAssignment => {
      this.assignments.push(addedAssignment);
      this.toggleModal(); // Close modal
    });
  }

  resetForm(): void {
    this.newAssignment = {
      assignment_id: '',
      content_id: 'C00X', // Reset to default or placeholder content ID
      assignment_title: '',
      description: '',
      deadline: null,
      max_score: 0,
      file_url: '',
      grading_criteria: '',
      instructions: '',
      submission_format: '',
      is_published: false,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}
