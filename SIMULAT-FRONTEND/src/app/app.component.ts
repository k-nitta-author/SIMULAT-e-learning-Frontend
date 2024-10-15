import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { FooterComponent } from './general/footer/footer.component';
import { NavigationBarComponent } from './general/navigation-bar/navigation-bar.component';
import { SidebarNavigationComponent } from './general/sidebar-navigation/sidebar-navigation.component';

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
