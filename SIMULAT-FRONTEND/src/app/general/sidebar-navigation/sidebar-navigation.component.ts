import { Component, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
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

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Listen for clicks on the entire document
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

  ngOnDestroy() {
    // Remove the global click listener when the component is destroyed
    this.globalClickListener();
  }
}
