import { Component } from '@angular/core';

import { AdminInfoViewComponent } from './admin-info-view/admin-info-view.component';
import { BadgeViewComponent } from './badge-view/badge-view.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';


@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [AdminInfoViewComponent, BadgeViewComponent, ProfileViewComponent],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css'
})
export class AccountPageComponent {

}