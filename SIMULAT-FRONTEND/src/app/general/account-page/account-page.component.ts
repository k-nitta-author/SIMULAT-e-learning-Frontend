import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  userId: string;

  constructor(private route: ActivatedRoute) {
    this.userId = this.route.snapshot.paramMap.get('id') || localStorage.getItem('user_id') || '';
  }
}
