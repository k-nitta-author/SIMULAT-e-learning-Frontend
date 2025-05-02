import { Component, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-navigation',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar-navigation.component.html',
  styleUrls: ['./sidebar-navigation.component.css']
})
export class SidebarNavigationComponent implements OnDestroy {

  isSidebarOpen = false; // Tracks if the sidebar is open
  private globalClickListener: () => void; // Reference to remove the event listener

  constructor(
    private el: ElementRef, 
    private renderer: Renderer2,
    private router: Router
  ) {
    this.globalClickListener = this.renderer.listen('document', 'click', (event: Event) => {
      this.handleDocumentClick(event);
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  handleDocumentClick(event: Event) {
    // Check if the click occurred outside the sidebar
    if (!this.el.nativeElement.contains(event.target)) {
      this.isSidebarOpen = false; // Collapse the sidebar
    }
  }

  handleNavigation(event: Event, route: string) {
    event.preventDefault();
    if (localStorage.length === 0) {
      alert('Please log in to access this feature');
      this.router.navigate(['/login']);
    } else {
      this.router.navigate([route]);
    }
  }

  ngOnDestroy() {
    // Remove the global click listener when the component is destroyed
    this.globalClickListener();
  }
}
