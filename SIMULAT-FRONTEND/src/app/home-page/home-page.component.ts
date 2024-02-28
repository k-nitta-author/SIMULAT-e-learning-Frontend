import { Component } from '@angular/core';

import { LoginFormComponent } from '../login-form/login-form.component';
import { AnnouncementsFeedComponent } from '../announcements-feed/announcements-feed.component';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [LoginFormComponent, AnnouncementsFeedComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
