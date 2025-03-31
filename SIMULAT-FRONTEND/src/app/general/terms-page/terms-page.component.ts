import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TermsService } from '../../backend-services/terms.service';
import { TermCardComponent } from './term-card/term-card.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

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

  constructor(private termsService: TermsService) {}

  ngOnInit(): void {
    this.getTerms();
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
    this.termsService.deleteTerm(id).subscribe({
      next: () => {
        this.terms = this.terms.filter(term => term.id !== id);
      },
      error: err => console.error('Error deleting term', err)
    });
  }

  validateDates(): boolean {
    const start = new Date(this.currentTerm.school_year_start);
    const end = new Date(this.currentTerm.school_year_end);
    
    if (end <= start) {
      this.dateError = 'End date must be after start date';
      return false;
    }
    
    this.dateError = '';
    return true;
  }

  addTerm(): void {
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
