import { CUSTOM_ELEMENTS_SCHEMA ,Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeavyService } from '../../backend-services/weavy.service';
import '@weavy/uikit-web';

@Component({
  selector: 'app-inbox-page',
  standalone: true,
  imports: [CommonModule],
  providers: [WeavyService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <wy-messenger></wy-messenger>
  `,
  templateUrl: './inbox-page.component.html',
  styleUrl: './inbox-page.component.css'
})
export class InboxPageComponent {
  constructor(private weavyService: WeavyService) { }
}
