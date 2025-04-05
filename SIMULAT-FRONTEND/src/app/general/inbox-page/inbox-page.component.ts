import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeavyService } from '../../backend-services/weavy.service';
import '@weavy/uikit-web';

@Component({
  selector: 'app-inbox-page',
  standalone: true,
  imports: [CommonModule],
  providers: [WeavyService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './inbox-page.component.html',
  styleUrls: ['./inbox-page.component.css']
})
export class ChatComponent {
  @Input() uid!: string;

  constructor(private weavyService: WeavyService) {
    this.weavyService = weavyService;
  }
}