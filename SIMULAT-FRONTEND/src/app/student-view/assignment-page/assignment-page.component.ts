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
  hasEditPermission: boolean = false;

  constructor(private assignmentService: AssignmentService) {}

  ngOnInit(): void {
    this.loadAssignments();
    this.checkUserPermissions();
  }

  checkUserPermissions(): void {
    const isAdmin = localStorage.getItem('is_admin') === 'true';
    const isInstructor = localStorage.getItem('is_instructor') === 'true';
    const isSuperAdmin = localStorage.getItem('is_super_admin') === 'true';
    this.hasEditPermission = isAdmin || isInstructor || isSuperAdmin;
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
    const { date, time } = this.parseDateTime(assignment.deadline);
    this.selectedAssignment = { 
      ...assignment,
      deadline: date,
      deadlineTime: time
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

  formatDeadline(date: string, time: string = '00:00'): string {
    const [year, month, day] = date.split('-');
    const [hours, minutes] = time.split(':');
    const d = new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes));
    return d.toUTCString();
  }

  parseDateTime(utcString: string): { date: string, time: string } {
    const d = new Date(utcString);
    return {
      date: d.toISOString().split('T')[0],
      time: d.toTimeString().slice(0, 5)
    };
  }

  addAssignment(): void {
    const formattedAssignment = {
      ...this.newAssignment,
      deadline: this.formatDeadline(this.newAssignment.deadline, this.newAssignment.deadlineTime)
    };

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
      const formattedAssignment = {
        ...this.selectedAssignment,
        deadline: this.formatDeadline(this.selectedAssignment.deadline, this.selectedAssignment.deadlineTime)
      };

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

