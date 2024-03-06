import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { SidebarNavigationComponent } from './sidebar-navigation/sidebar-navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
            RouterOutlet,
            RouterModule,
            FooterComponent,
            NavigationBarComponent,
            SidebarNavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SIMULAT-FRONTEND';
}
