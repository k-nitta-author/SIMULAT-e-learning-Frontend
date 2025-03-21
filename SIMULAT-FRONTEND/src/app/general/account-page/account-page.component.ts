import { Component } from '@angular/core';

import { AdminInfoViewComponent } from './admin-info-view/admin-info-view.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';


@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [AdminInfoViewComponent, ProfileViewComponent],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css'
})
export class AccountPageComponent {

}
