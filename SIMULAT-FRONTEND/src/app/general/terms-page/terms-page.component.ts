import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TermsService } from '../../backend-services/terms.service';
import { TermCardComponent } from './term-card/term-card.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Remove AuthService import

interface Term {
  id: number;
  school_year_end: string;
  school_year_start: string;
}

@Component({
  selector: 'app-terms-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TermCardComponent,
    HttpClientModule,
    RouterModule
  ],
  providers: [TermsService],
  templateUrl: './terms-page.component.html',
  styleUrls: ['./terms-page.component.css']
})
export class TermsPageComponent implements OnInit {
  terms: Term[] = [];
  isModalOpen: boolean = false;
  isEditMode: boolean = false;
  currentTerm: Term = this.getEmptyTerm();
  dateError: string = '';
  minStartDate = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD
  isAuthorized: boolean = false;
  maxEndDate: string = new Date(new Date().setFullYear(new Date().getFullYear() + 10)).toISOString().split('T')[0]; // 10 years from now

  constructor(
    private termsService: TermsService // Remove AuthService
  ) {}

  ngOnInit(): void {
    this.getTerms();
    this.checkAuthorization();
  }

  checkAuthorization(): void {
    const isAdmin = localStorage.getItem('is_admin') === 'true';
    const isInstructor = localStorage.getItem('is_instructor') === 'true';
    this.isAuthorized = isAdmin || isInstructor;
  }

  getTerms(): void {
    this.termsService.getAllTerms().subscribe({
      next: res => {
        this.terms = res.map(term => ({
          ...term,
          school_year_end: formatDate(new Date(term.school_year_end), 'dd/MM/yyyy', 'en-US'),
          school_year_start: formatDate(new Date(term.school_year_start), 'dd/MM/yyyy', 'en-US')
        }));
      },
      error: err => console.error('Error loading terms', err)
    });
  }

  deleteTerm(id: number): void {
    this.checkAuthorization();
    if (!this.isAuthorized) {
      alert('Unauthorized: Only administrators and instructors can delete terms');
      return;
    }
    this.termsService.deleteTerm(id).subscribe({
      next: () => {
        this.terms = this.terms.filter(term => term.id !== id);
      },
      error: err => console.error('Error deleting term', err)
    });
  }

  validateDates(): boolean {
    if (!this.currentTerm.school_year_start || !this.currentTerm.school_year_end) {
      this.dateError = 'Both start and end dates are required';
      return false;
    }

    const start = new Date(this.currentTerm.school_year_start);
    const end = new Date(this.currentTerm.school_year_end);
    const today = new Date();
    const maxDate = new Date(this.maxEndDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      this.dateError = 'Invalid date format';
      return false;
    }

    if (end <= start) {
      this.dateError = 'End date must be after start date';
      return false;
    }

    if (start > maxDate || end > maxDate) {
      this.dateError = 'Dates cannot be more than 10 years in the future';
      return false;
    }
    
    this.dateError = '';
    return true;
  }

  onDateChange(): void {
    this.validateDates();
  }

  addTerm(): void {
    this.checkAuthorization();
    if (!this.isAuthorized) {
      alert('Unauthorized: Only administrators and instructors can add terms');
      return;
    }
    if (!this.validateDates()) {
      return;
    }
    if (!this.isEditMode && this.validateDates()) {
      this.termsService.createTerm(this.currentTerm).subscribe({
        next: () => {
          this.getTerms(); // Refresh the list
          this.closeModal();
        },
        error: err => console.error('Error saving term', err)
      });
    }
  }

  updateTerm(): void {
    this.checkAuthorization();
    if (!this.isAuthorized) {
      alert('Unauthorized: Only administrators and instructors can update terms');
      return;
    }
    if (!this.validateDates()) {
      return;
    }
    if (this.isEditMode && this.validateDates()) {
      this.termsService.updateTerm(this.currentTerm.id, this.currentTerm).subscribe({
        next: () => {
          this.getTerms(); // Refresh the list
          this.closeModal();
        },
        error: err => console.error('Error updating term', err)
      });
    }
  }

  openModal(): void {
    this.checkAuthorization();
    if (!this.isAuthorized) {
      alert('Unauthorized: Only administrators and instructors can modify terms');
      return;
    }
    this.isEditMode = false;
    this.currentTerm = this.getEmptyTerm();
    this.isModalOpen = true;
  }

  editTerm(term?: any): void {
    this.isEditMode = true; // If term exists, it's Edit mode
    this.currentTerm = term ? { ...term } : this.getEmptyTerm();
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  getEmptyTerm(): Term {
    const today = new Date();
    const nextYear = new Date(today.setFullYear(today.getFullYear() + 1));
    
    return {
      id: -1,
      school_year_start: new Date().toISOString().split('T')[0],
      school_year_end: nextYear.toISOString().split('T')[0]
    };
  }
}
