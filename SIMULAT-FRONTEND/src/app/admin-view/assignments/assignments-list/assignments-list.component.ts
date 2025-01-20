import { Component, OnInit } from '@angular/core';
import { Assignment, AssignmentService } from '../../../backend-services/assignment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assignments-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assignments-list.component.html',
  styleUrls: ['./assignments-list.component.css']
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

  // Fetch all assignments
  getAssignments(): void {
    this.assignmentService.getAllAssignments().subscribe(assignments => {
      this.assignments = assignments.map(assignment => ({
        ...assignment,
        deadline: assignment.deadline ? new Date(assignment.deadline) : null
      }));
    });
  }

  // Open modal with assignment data for editing
  editAssignment(id: string): void {
    const assignmentToEdit = this.assignments.find(assignment => assignment.assignment_id === id);
    if (assignmentToEdit) {
      this.newAssignment = { ...assignmentToEdit }; // Clone data to avoid mutations
      this.isModalOpen = true; // Open modal
    }
  }

  // Delete an assignment
  deleteAssignment(id: string): void {
    this.assignmentService.deleteAssignment(id).subscribe(() => {
      this.getAssignments(); // Refresh list
    });
  }

  // Toggle modal for adding or editing assignments
  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
    if (!this.isModalOpen) {
      this.resetForm(); // Reset the form when closing the modal
    }
  }

  // Submit the form (for adding or editing)
  onSubmit(): void {
    if (!this.newAssignment.assignment_title || !this.newAssignment.description) {
      alert('Please fill out all required fields.');
      return;
    }

    if (this.newAssignment.assignment_id) {
      // If editing an existing assignment
      this.assignmentService.updateAssignment(this.newAssignment.assignment_id, this.newAssignment).subscribe(updatedAssignment => {
        if (updatedAssignment) {
          const index = this.assignments.findIndex(a => a.assignment_id === updatedAssignment.assignment_id);
          if (index !== -1) {
            this.assignments[index] = updatedAssignment; // Update list
          }
        }
        this.toggleModal(); // Close modal
      });
    } else {
      // If adding a new assignment
      this.newAssignment.assignment_id = (this.assignments.length + 1).toString(); // Assign ID
      this.assignmentService.addAssignment(this.newAssignment).subscribe(addedAssignment => {
        this.assignments.push(addedAssignment);
        this.toggleModal(); // Close modal
      });
    }
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
