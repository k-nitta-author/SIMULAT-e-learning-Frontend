import { Component, OnInit } from '@angular/core';
import { AssignmentService, Assignment, AssignmentResponse } from '../../backend-services/assignment.service';
import { DatePipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assignment-page',
  standalone: true,
  imports: [DatePipe, CommonModule, RouterModule, FormsModule],
  templateUrl: './assignment-page.component.html',
  styleUrls: ['./assignment-page.component.css']
})
export class AssignmentPageComponent implements OnInit {
  assignments: Assignment[] = [];
  showAddModal = false;
  showEditModal = false;
  showDeleteModal = false;
  selectedAssignment: Assignment | null = null;
  newAssignment: Assignment = {
    assignment_title: '',
    content_id: 0,
    created_at: new Date().toISOString(),
    deadline: '',
    deadlineTime: '00:00',
    description: '',
    grading_criteria: '',
    id: 0,
    instructions: '',
    max_score: 0,
    submission_format: '',
    term_id: 1, // Set default term_id
    updated_at: new Date().toISOString()
  };

  constructor(private assignmentService: AssignmentService) {}

  ngOnInit(): void {
    this.loadAssignments();
  }

  loadAssignments(): void {
    this.assignmentService.getAllAssignments().subscribe({
      next: (data: Assignment[]) => {
        this.assignments = data;
      },
      error: (error) => {
        console.error('Error fetching assignments:', error);
      }
    });
  }

  openAddModal(): void {
    this.showAddModal = true;
  }

  openEditModal(assignment: Assignment): void {
    let dateStr = '';
    let timeStr = '00:00';
    
    if (assignment.deadline) {
      const date = new Date(assignment.deadline);
      dateStr = date.toISOString().split('T')[0];
      timeStr = date.toTimeString().split(' ')[0].substr(0, 5);
    }

    this.selectedAssignment = { 
      ...assignment,
      deadline: dateStr,
      deadlineTime: timeStr
    };
    this.showEditModal = true;
  }

  openDeleteModal(assignment: Assignment): void {
    this.selectedAssignment = assignment;
    this.showDeleteModal = true;
  }

  closeModals(): void {
    this.showAddModal = false;
    this.showEditModal = false;
    this.showDeleteModal = false;
    this.selectedAssignment = null;
  }

  addAssignment(): void {
    const dateStr = this.newAssignment.deadline;
    const timeStr = this.newAssignment.deadlineTime || '00:00';
    const combinedDate = new Date(`${dateStr}T${timeStr}`);

    const formattedAssignment = {
      ...this.newAssignment,
      deadline: combinedDate.toUTCString()
    };
    delete formattedAssignment.deadlineTime;

    this.assignmentService.addAssignment(formattedAssignment).subscribe({
      next: (response: AssignmentResponse) => {
        if (response.message === 'assignment created' && response.assignment) {
          this.loadAssignments();
          this.closeModals();
        } else {
          console.error('Error:', response.error || 'Unknown error occurred');
        }
      },
      error: (error) => console.error('Error adding assignment:', error)
    });
  }

  updateAssignment(): void {
    if (this.selectedAssignment) {
      const dateStr = this.selectedAssignment.deadline;
      const timeStr = this.selectedAssignment.deadlineTime || '00:00';
      const combinedDate = new Date(`${dateStr}T${timeStr}`);

      const formattedAssignment = {
        ...this.selectedAssignment,
        deadline: combinedDate.toUTCString()
      };
      delete formattedAssignment.deadlineTime;

      this.assignmentService.updateAssignment(formattedAssignment.id, formattedAssignment).subscribe({
        next: (response: AssignmentResponse) => {
          if (response.message === 'assignment updated' && response.assignment) {
            this.loadAssignments();
            this.closeModals();
          } else {
            console.error('Error:', response.error || 'Unknown error occurred');
          }
        },
        error: (error) => console.error('Error updating assignment:', error)
      });
    }
  }

  deleteAssignment(): void {
    if (this.selectedAssignment) {
      this.assignmentService.deleteAssignment(this.selectedAssignment.id).subscribe({
        next: (response: AssignmentResponse) => {
          if (response.message === 'assignment_deleted') {
            this.loadAssignments();
            this.closeModals();
          } else {
            console.error('Error:', response.error);
          }
        },
        error: (error) => console.error('Error deleting assignment:', error)
      });
    }
  }
}

