import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradebookEntry } from '../../../interfaces/gradebook.interface';

@Component({
  selector: 'app-gradebook-table-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gradebook-table-view.component.html',
  styleUrls: ['./gradebook-table-view.component.css']
})
export class GradebookTableViewComponent {
  @Input() gradebookEntries: GradebookEntry[] = [];

  get currentEntry(): GradebookEntry | null {
    return this.gradebookEntries[0] || null;
  }
}
