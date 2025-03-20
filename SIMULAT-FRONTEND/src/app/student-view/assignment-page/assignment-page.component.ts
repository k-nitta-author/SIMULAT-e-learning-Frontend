import { Component, OnInit } from '@angular/core';
import { AssignmentService, Assignment } from '../../backend-services/assignment.service';
import { DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-assignment-page',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './assignment-page.component.html',
  styleUrls: ['./assignment-page.component.css']
})
export class AssignmentPageComponent implements OnInit {

  assignments: Assignment[] = [];

  constructor(private assignmentService: AssignmentService) 
  {
    this.assignments = [{ assignment_title: '', content_id: 0, created_at: '', deadline: '', description: '', grading_criteria: '', id: 0, instructions: '', max_score: 0, submission_format: '', term: { id: 0, school_year_end: '', school_year_start: '' }, scores: [] as Assignment['scores'], term_id: 0, updated_at: '' }];
  }

  ngOnInit(): void {
    this.assignmentService.getAllAssignments().subscribe({

      next: (data: Assignment[]) => {
        this.assignments = data;
      },
      error: (error) => {
        console.error('Error fetching assignments:', error);
      }
    });
  }
}

