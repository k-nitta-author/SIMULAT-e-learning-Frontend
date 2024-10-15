import { CUSTOM_ELEMENTS_SCHEMA, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeavyService } from '../../../services/weavy.service';

@Component({
  selector: 'app-bulletin-board',
  standalone: true,
  templateUrl: './bulletin-board.component.html',
  styleUrls: ['./bulletin-board.component.css'],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class BulletinBoardComponent {

  constructor(private weavyService: WeavyService) { }

}

@NgModule({
  imports: [CommonModule, BulletinBoardComponent],
  providers: [WeavyService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [BulletinBoardComponent]
})
export class BulletinBoardModule { }
