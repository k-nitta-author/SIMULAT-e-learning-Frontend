import { Component } from '@angular/core';

import { ContactFormComponent } from './contact-form/contact-form.component';
import { HelpCenterComponent } from './help-center/help-center.component';


@Component({
  selector: 'app-support-page',
  standalone: true,
  imports: [ContactFormComponent, HelpCenterComponent],
  templateUrl: './support-page.component.html',
  styleUrl: './support-page.component.css'
})
export class SupportPageComponent {

}
