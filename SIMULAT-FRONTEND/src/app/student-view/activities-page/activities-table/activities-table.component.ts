import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { activity_info } from '../../../general/interfaces/activity';

@Component({
  selector: 'app-activities-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activities-table.component.html',
  styleUrls: ['./activities-table.component.css']
})
export class ActivitiesTableComponent {
  @Input() headers: string[] = ["status", "title", "dueDate"]; // ✅ Default headers

  @Input() rows: activity_info[] = [ 
    { status: "In Progress", title: "Module 1 Quiz", dueDate: "2025-02-15" },
    { status: "Not Started", title: "Research Assignment", dueDate: "2025-03-01" },
    { status: "Completed", title: "Initial Project Proposal", dueDate: "2025-01-20" }
  ];

  // Mapping for display names
  headerDisplayNames: { [key: string]: string } = {
    status: "Status",
    title: "Title",    // ✅ Changed "Name" → "Title"
    dueDate: "Due Date"
  };

  getValue(row: activity_info, column: string): string {
    return row[column as keyof activity_info] ?? 'Not Found';
  }

  getCellClass(column: string): string {
    const cellClasses: { [key: string]: string } = {
      status: "status_cell",
      title: "title_cell",
      dueDate: "duedate_cell"
    };

    return cellClasses[column] || "duedate_cell";
  }
}
