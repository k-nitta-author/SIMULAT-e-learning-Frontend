import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BulletinBoardFormComponent } from './bulletin-board-form/bulletin-board-form.component';
import { BulletinBoardComponent, BulletinBoardModule } from './bulletin-board/bulletin-board.component';
import { StudyGroupPreviewComponent } from './study-group-preview/study-group-preview.component';
import { StudyGroupSectionComponent } from './study-group-section/study-group-section.component';

@Component({
  selector: 'app-community-hall',
  standalone: true,
  imports: [ BulletinBoardComponent, BulletinBoardFormComponent, StudyGroupPreviewComponent, StudyGroupSectionComponent],
  templateUrl: './community-hall.component.html',
  styleUrl: './community-hall.component.css'
})
export class CommunityHallComponent {

}

@NgModule({
  imports: [CommonModule, CommunityHallComponent],
  exports: [CommunityHallComponent]
})
export class CommunityHallModule { }