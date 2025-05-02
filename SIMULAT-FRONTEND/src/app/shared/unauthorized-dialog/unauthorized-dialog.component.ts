import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized-dialog',
  standalone: true,
  imports: [],
  template: `
    <h2 mat-dialog-title>Login Required</h2>
    <mat-dialog-content>
      You need to log in to access this feature.
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="goToLogin()">Go to Login</button>
    </mat-dialog-actions>
  `
})
export class UnauthorizedDialogComponent {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
