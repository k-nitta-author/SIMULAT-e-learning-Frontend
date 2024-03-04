import { Component } from '@angular/core';

import { BulletinBoardFormComponent } from './bulletin-board-form/bulletin-board-form.component';
import { BulletinBoardComponent } from './bulletin-board/bulletin-board.component';
import { StudyGroupPreviewComponent } from './study-group-preview/study-group-preview.component';
import { StudyGroupSectionComponent } from './study-group-section/study-group-section.component';

@Component({
  selector: 'app-community-hall',
  standalone: true,
  imports: [BulletinBoardFormComponent, BulletinBoardComponent, StudyGroupPreviewComponent, StudyGroupSectionComponent],
  templateUrl: './community-hall.component.html',
  styleUrl: './community-hall.component.css'
})
export class CommunityHallComponent {

}
