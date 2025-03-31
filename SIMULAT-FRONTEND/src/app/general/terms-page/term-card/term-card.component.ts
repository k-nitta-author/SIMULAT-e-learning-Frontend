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
  @Output() edit = new EventEmitter<Term>();
  @Output() delete = new EventEmitter<number>();

  onEdit(): void {
    this.edit.emit(this.term);
  }

  onDelete(): void {
    this.delete.emit(this.term.id);
  }
}
