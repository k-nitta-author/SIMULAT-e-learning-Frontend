import { Component, OnInit } from '@angular/core';
import { Assignment, AssignmentService, AssignmentResponse } from '../../../backend-services/assignment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-assignments-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './assignments-list.component.html',
  styleUrls: ['./assignments-list.component.css']
})
export class AssignmentsListComponent implements OnInit {
  assignments: Assignment[] = [];
  editingId: number | null = null;
  editingAssignment: Assignment | null = null;

  constructor(private assignmentService: AssignmentService) {}

  ngOnInit(): void {
    this.getAssignments();
  }

  private formatDateForBackend(date: string): string {
    const d = new Date(date);
    return d.toUTCString();
  }

  private formatDateForDisplay(date: string): string {
    try {
      const d = new Date(date);
      return d.toISOString().split('T')[0];
    } catch {
      return new Date().toISOString().split('T')[0];
    }
  }

  // Fetch all assignments
  getAssignments(): void {
    this.assignmentService.getAllAssignments().subscribe(assignments => {
      this.assignments = assignments.map(assignment => ({
        ...assignment,
        deadline: this.formatDateForDisplay(assignment.deadline)
      }));
    });
  }

  // Start editing an assignment inline
  startEditing(assignment: Assignment): void {
    this.editingId = assignment.id;
    this.editingAssignment = { ...assignment };
  }

  // Cancel inline editing
  cancelEditing(): void {
    this.editingId = null;
    this.editingAssignment = null;
  }

  // Save changes made during inline editing
  saveEditing(assignment: Assignment): void {
    if (!this.editingAssignment) return;
    
    if (!this.editingAssignment.assignment_title || !this.editingAssignment.description) {
      alert('Please fill out all required fields.');
      return;
    }

    const assignmentToSend = {
      ...this.editingAssignment,
      deadline: this.formatDateForBackend(this.editingAssignment.deadline)
    };

    this.assignmentService.updateAssignment(assignment.id, assignmentToSend).subscribe({
      next: (response: AssignmentResponse) => {
        if (response.message === 'assignment updated') {
          this.getAssignments(); // Refresh the list
          this.cancelEditing();
        } else {
          alert('Failed to update assignment: ' + (response.error || 'Unknown error'));
        }
      },
      error: (error) => {
        console.error('Error updating assignment:', error);
        alert('Failed to update assignment');
      }
    });
  }

  // Delete an assignment
  deleteAssignment(id: number): void {
    if (confirm('Are you sure you want to delete this assignment?')) {
      this.assignmentService.deleteAssignment(id).subscribe({
        next: () => {
          this.assignments = this.assignments.filter(a => a.id !== id);
        },
        error: (error) => {
          console.error('Error deleting assignment:', error);
          alert('Failed to delete assignment');
        }
      });
    }
  }

  // Add a new assignment and start editing it inline
  addNewAssignment(): void {
    const newAssignment: Assignment = {
      assignment_title: 'New Assignment',
      content_id: 1,
      created_at: new Date().toISOString(),
      deadline: this.formatDateForBackend(new Date().toISOString()),
      description: '',
      grading_criteria: '',
      id: 0,
      instructions: '',
      max_score: 0,
      submission_format: '',
      term_id: 1,
      updated_at: new Date().toISOString()
    };
    
    this.assignmentService.addAssignment(newAssignment).subscribe({
      next: (response: AssignmentResponse) => {
        if (response.message === 'assignment created') {
          this.getAssignments(); // Refresh the list
        } else {
          alert('Failed to add assignment: ' + (response.error || 'Unknown error'));
        }
      },
      error: (error) => {
        console.error('Error adding assignment:', error);
        alert('Failed to add new assignment');
      }
    });
  }
}
