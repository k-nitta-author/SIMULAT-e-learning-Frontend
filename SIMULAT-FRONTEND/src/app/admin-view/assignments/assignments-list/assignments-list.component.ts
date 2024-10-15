import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../../../services/assignment.service';

@Component({
  selector: 'app-assignments-list',
  templateUrl: './assignments-list.component.html',
})
export class AssignmentsListComponent implements OnInit {
  assignments: any[] = [];

  constructor(private assignmentService: AssignmentService) {}

  ngOnInit(): void {
    this.getAssignments();
  }

  getAssignments(): void {
    this.assignmentService.getAllAssignments().subscribe((data) => {
      this.assignments = data;
    });
  }

  editAssignment(id: string): void {
    // Navigate to edit page
  }

  deleteAssignment(id: string): void {
    this.assignmentService.deleteAssignment(id).subscribe(() => {
      this.getAssignments(); // Refresh list
    });
  }
}
