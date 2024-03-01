import { Component } from '@angular/core';

import { LoginFormComponent } from '../login-form/login-form.component';
import { AnnouncementsFeedComponent } from '../announcements-feed/announcements-feed.component';

// This is the component for the Home Page
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
            LoginFormComponent, // the login form that may be found on the homepage
            AnnouncementsFeedComponent // the homepage contains a group of announcements
          ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
