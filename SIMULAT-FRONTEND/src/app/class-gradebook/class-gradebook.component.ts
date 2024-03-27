import { Component } from '@angular/core';
import { GradebookTableViewComponent } from './gradebook-table-view/gradebook-table-view.component';


@Component({
  selector: 'app-class-gradebook',
  standalone: true,
  imports: [GradebookTableViewComponent],
  templateUrl: './class-gradebook.component.html',
  styleUrl: './class-gradebook.component.css'
})
export class ClassGradebookComponent {

}
