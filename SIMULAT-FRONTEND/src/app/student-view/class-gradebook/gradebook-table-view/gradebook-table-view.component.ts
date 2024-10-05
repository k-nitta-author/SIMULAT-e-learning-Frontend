import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { grade_info } from '../../interfaces/grade';

@Component({
  selector: 'app-gradebook-table-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gradebook-table-view.component.html',
  styleUrl: './gradebook-table-view.component.css'
})
export class GradebookTableViewComponent {




  headers = ["grade", "name", "status"];

  // dummy data to be used to populate the tables
  rows: grade_info[] = [
    {
      ID: "1",
      grade: "45/100",
      name: "TAP: Reading about Arrays",
      status: "Passed"
    },

    {
      "ID": "1",
      "grade": "45/100",
      "name": "TAP: Reading about Arrays",
      "status": "Passed"
    },

    {
      "ID": "1",
      "grade": "45/100",
      "name": "TAP: Reading about Arrays",
      "status": "Passed"
    }
  ];


  // parameter is a column name
  // simply returns the css class defined for the type of table cell
  getCellClass(column_value: string){

    const cell_classes: { [key: string]: string } = {"grade":"grade_cell", "name":"name_cell", "status":"status_cell"};

    return cell_classes[column_value] || "grade_cell";
  }






}
