import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Term {
  id: number;
  school_year_start: string;
  school_year_end: string;
}

@Component({
  selector: 'app-term-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './term-card.component.html',
  styleUrl: './term-card.component.css'
})
export class TermCardComponent {
  @Input() term!: Term;
  @Input() showActions: boolean = false;
  @Output() edit = new EventEmitter<Term>();
  @Output() delete = new EventEmitter<number>();

  onEdit(): void {
    const isAdmin = localStorage.getItem('is_admin') === 'true';
    const isInstructor = localStorage.getItem('is_instructor') === 'true';
    
    if (!isAdmin && !isInstructor) {
      alert('Unauthorized: Only administrators and instructors can edit terms');
      return;
    }
    this.edit.emit(this.term);
  }

  onDelete(): void {
    const isAdmin = localStorage.getItem('is_admin') === 'true';
    const isInstructor = localStorage.getItem('is_instructor') === 'true';
    
    if (!isAdmin && !isInstructor) {
      alert('Unauthorized: Only administrators and instructors can delete terms');
      return;
    }
    this.delete.emit(this.term.id);
  }
}
