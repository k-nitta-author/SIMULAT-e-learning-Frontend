import { Component, OnInit } from '@angular/core';
import { NgForOf,NgIf, formatDate } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Term {
  id: number;
  school_year_end: string;
  school_year_start: string;
}

@Component({
  selector: 'app-terms-page',
  standalone: true,
  imports: [HttpClientModule, NgForOf,NgIf, FormsModule],
  templateUrl: './terms-page.component.html',
  styleUrls: ['./terms-page.component.css']
})
export class TermsPageComponent implements OnInit {
  terms: Term[] = [];
  isModalOpen: boolean = false;
  isEditMode: boolean = false;
  currentTerm: Term = this.getEmptyTerm();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTerms();
  }


  // Deletes a term by sending a DELETE request
  deleteTerm(id: number): void {
    const url = `https://simulat-e-learning-backend.onrender.com/term/${id}`;
    this.http.delete(url).subscribe({
      next: () => {
        console.log('Term deleted successfully');
        this.terms = this.terms.filter(term => term.id !== id);
      },
      error: err => console.error('Error deleting term', err)
    });
  }


  addTerm(): void
  {
    if (!this.isEditMode){
      // POST request for adding a new term
      console.log('Sending student data:', this.currentTerm);
      this.http.post<Term>('https://simulat-e-learning-backend.onrender.com/term', this.currentTerm)
        .subscribe({
          next: res => {
            console.log('Student saved', res);
            this.terms.push(this.currentTerm);
            this.closeModal();
          },
          error: err => console.error('Error saving student', err)
        });
    }
  }

  updateTerm(): void
  {
    if (this.isEditMode) {
      // PUT request for updating an existing student
      const url = `https://simulat-e-learning-backend.onrender.com/term/${this.currentTerm.id}`;
      this.http.put<Term>(url, this.currentTerm).subscribe({
        next: res => {
          console.log('user updated', res);
          const index = this.terms.findIndex(s => s.id === res.id);
          if (index !== -1) {
            this.terms[index] = res;
          }
          this.closeModal();
        },
        error: err => console.error('Error updating term', err)
      });
    }
  }

  openModal(): void
  {
    this.isEditMode = false;
    this.currentTerm = this.getEmptyTerm();
    this.isModalOpen = true;
  }


  editTerm(term?: any): void
  {
    this.isEditMode = true; // If student exists, it's Edit mode
    this.currentTerm = term ? { ...term } : this.getEmptyTerm();
    this.isModalOpen = true;
  }


  closeModal(): void
  {
    this.isModalOpen = false;
  }

  getEmptyTerm(): Term
  {
    return { id: -1, school_year_end: "11/05/2024", school_year_start: "11/05/2024" }
  }

  getTerms(): void {
    const url = 'https://simulat-e-learning-backend.onrender.com/term';
    this.http.get<Term[]>(url).subscribe({
      next: res => {

        for (let index = 0; index < res.length; index++) {
          const term = res[index];

          term.school_year_end = formatDate(term.school_year_end, 'dd/MM/yyyy', "en_PH");
          term.school_year_start = formatDate(term.school_year_start, 'dd/MM/yyyy', "en_PH");
        }

        this.terms = res;
      },
      error: err => console.error('Error loading terms', err)
    });
  }
}
