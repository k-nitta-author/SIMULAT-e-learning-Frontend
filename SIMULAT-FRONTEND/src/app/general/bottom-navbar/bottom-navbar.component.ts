import { Component, OnInit, OnDestroy, NgZone, HostListener } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { trigger, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bottom-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bottom-navbar.component.html',
  styleUrls: ['./bottom-navbar.component.css'],
  animations: [
      trigger('dropdownAnimation', [
        transition(':enter', [
          style({ opacity: 0, transform: 'scale(0.95)' }),
          animate('150ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
        ]),
        transition(':leave', [
          animate('100ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
        ])
      ])
    ]
})
export class BottomNavbarComponent implements OnInit, OnDestroy {
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
    this.checkUserRole();
    this.checkAuthentication();

    window.addEventListener('storage', this.storageListener);

    this.storageCheckInterval = setInterval(() => {
      this.ngZone.run(() => {
        this.checkAuthentication();
        this.checkUserRole();
      });
    }, 1000);
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

  isStudiesOpen = false;
  isMobile = window.innerWidth < 768;

  toggleStudiesMenu(): void {
    this.isStudiesOpen = !this.isStudiesOpen;
  }

  closeStudiesMenu(): void {
    this.isStudiesOpen = false;
  }

}
