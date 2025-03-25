import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  private storageListener: (event: StorageEvent) => void;

  constructor() {
    this.storageListener = (event: StorageEvent) => {
      if (event.key === 'is_instructor') {
        this.checkUserRole();
      }
    };
  }

  ngOnInit() {
    this.checkUserRole();
    window.addEventListener('storage', this.storageListener);
  }

  ngOnDestroy() {
    window.removeEventListener('storage', this.storageListener);
  }

  checkUserRole() {
    const isInstructor = localStorage.getItem('is_instructor');
    this.isInstructor = isInstructor === 'true';
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
