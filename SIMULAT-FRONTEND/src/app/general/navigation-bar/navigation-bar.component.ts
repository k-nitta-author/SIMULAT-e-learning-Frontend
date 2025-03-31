import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent implements OnInit, OnDestroy {
  isInstructor: boolean = false;
  isAuthenticated: boolean = false;
  private storageListener: (event: StorageEvent) => void;
  private storageCheckInterval: any;

  constructor(private router: Router, private ngZone: NgZone) {
    this.storageListener = (event: StorageEvent) => {
      if (event.key === 'is_instructor' || event.key === 'user_id') {
        this.ngZone.run(() => {
          this.checkUserRole();
          this.checkAuthentication();
        });
      }
    };
  }

  ngOnInit() {
    // Initial check
    this.checkUserRole();
    this.checkAuthentication();
    
    // Add storage event listener
    window.addEventListener('storage', this.storageListener);
    
    // Poll for localStorage changes
    this.storageCheckInterval = setInterval(() => {
      this.ngZone.run(() => {
        this.checkAuthentication();
        this.checkUserRole();
      });
    }, 1000); // Check every second
  }

  ngOnDestroy() {
    window.removeEventListener('storage', this.storageListener);
    if (this.storageCheckInterval) {
      clearInterval(this.storageCheckInterval);
    }
  }

  checkUserRole() {
    const isInstructor = localStorage.getItem('is_instructor');
    this.isInstructor = isInstructor === 'true';
  }

  checkAuthentication() {
    const userId = localStorage.getItem('user_id');
    const wasAuthenticated = this.isAuthenticated;
    this.isAuthenticated = !!userId;
    
    // Force change detection if authentication state changed
    if (wasAuthenticated !== this.isAuthenticated) {
      this.ngZone.run(() => {});
    }
  }

  logout() {
    localStorage.clear();
    this.isAuthenticated = false;
    this.isInstructor = false;
    this.router.navigate(['/home']);
  }

  getNavigationLinks() {
    if (this.isInstructor) {
      return [
        { path: '/admin/dashboard', label: 'Dashboard' },
        { path: '/admin/students', label: 'Students' },
        { path: '/admin/content', label: 'Content' },
        { path: '/admin/assignments', label: 'Assignments' },
        { path: '/admin/quizzes', label: 'Quizzes' },
        { path: '/admin/badges', label: 'Badges' }
      ];
    } else {
      return [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/courses', label: 'Courses' },
        { path: '/challenge', label: 'Challenges' },
        { path: '/study-group', label: 'Study Groups' },
        { path: '/badge', label: 'Badges' }
      ];
    }
  }
}
