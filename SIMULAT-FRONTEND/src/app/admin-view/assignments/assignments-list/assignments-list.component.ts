import { Component, OnInit } from '@angular/core';
import { Assignment, AssignmentService } from '../../../services/assignment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assignments-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assignments-list.component.html',
})
export class AssignmentsListComponent implements OnInit {
  assignments: Assignment[] = [];

  constructor(private assignmentService: AssignmentService) {}

  ngOnInit(): void {
    this.assignmentService.getAllAssignments().subscribe(assignments => {
      console.log('Fetched assignments:', assignments); // Log fetched data
      this.assignments = assignments.map(assignment => ({
        ...assignment,
        deadline: assignment.deadline ? new Date(assignment.deadline) : null
      }));
      console.log('Processed assignments:', this.assignments); // Log processed data
    });
  }
  

  getAssignments(): void {
    this.assignmentService.getAllAssignments().subscribe((data) => {
      console.log('Fetched assignments:', data);
      this.assignments = data;
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
}
