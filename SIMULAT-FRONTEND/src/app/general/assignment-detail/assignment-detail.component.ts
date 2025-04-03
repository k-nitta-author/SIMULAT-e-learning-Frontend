import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService, Assignment, AssignmentScore } from '../../backend-services/assignment.service';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent implements OnInit {
  assignment: Assignment | undefined;
  scores: AssignmentScore[] = [];
  error: string | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private assignmentService: AssignmentService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAssignment(id);
    this.loadScores(id);
  }

  private loadAssignment(id: number) {
    this.assignmentService.getAssignmentById(id).subscribe({
      next: (data) => {
        this.assignment = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      }
    });
  }

  private loadScores(id: number) {
    this.assignmentService.getAssignmentScores(id).subscribe({
      next: (scores) => this.scores = scores,
      error: (error) => console.error('Error loading scores:', error)
    });
  }
}
