import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TermsService } from '../../backend-services/terms.service';
import { CoursesService } from '../../backend-services/courses.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  terms: any[] = [];
  selectedTerm: string = 'all';

  constructor(
    private termsService: TermsService,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.loadTerms();
  }

  loadTerms() {
    this.termsService.getAllTerms().subscribe({
      next: (data) => {
        this.terms = data;
      },
      error: (error) => {
        console.error('Error loading terms:', error);
      }
    });
  }

  formatSchoolYear(dateString: string): string {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  }
}
