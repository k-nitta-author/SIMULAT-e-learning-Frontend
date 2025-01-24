import { Component } from '@angular/core';
import { TermCardComponent } from './term-card/term-card.component';

@Component({
  selector: 'app-terms-page',
  standalone: true,
  imports: [TermCardComponent],
  templateUrl: './terms-page.component.html',
  styleUrl: './terms-page.component.css'
})
export class TermsPageComponent {

}
