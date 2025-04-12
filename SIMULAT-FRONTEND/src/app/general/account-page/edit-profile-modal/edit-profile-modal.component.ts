import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Student } from '../../../backend-services/student.service';

@Component({
  selector: 'app-edit-profile-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="isOpen" class="modal-overlay">
      <div class="modal-content">
        <h3>Edit Profile</h3>
        <form (ngSubmit)="onSubmit()" *ngIf="userData">
          <div class="form-group">
            <label>First Name</label>
            <input type="text" [(ngModel)]="userData.name_given" name="name_given">
          </div>
          <div class="form-group">
            <label>Last Name</label>
            <input type="text" [(ngModel)]="userData.name_last" name="name_last">
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" [(ngModel)]="userData.email" name="email">
          </div>
          <div class="form-group">
            <label>Username</label>
            <input type="text" [(ngModel)]="userData.username" name="username">
          </div>
          <div class="form-group">
            <label>Gender</label>
            <select [(ngModel)]="userData.gender" name="gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="modal-actions">
            <button type="button" (click)="close()">Cancel</button>
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      @apply fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50;
    }
    .modal-content {
      @apply bg-white p-6 rounded-lg w-full max-w-md;
    }
    .form-group {
      @apply mb-4;
    }
    .form-group label {
      @apply block mb-2 text-sm font-medium text-gray-700;
    }
    .form-group input {
      @apply w-full p-2 border border-gray-300 rounded;
    }
    .modal-actions {
      @apply flex justify-end gap-4 mt-6;
    }
    .modal-actions button {
      @apply px-4 py-2 rounded;
    }
    .modal-actions button[type="submit"] {
      @apply bg-blue-600 text-white;
    }
  `]
})
export class EditProfileModalComponent {
  @Input() isOpen = false;
  @Input() userData: Student | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveChanges = new EventEmitter<Student>();

  close() {
    this.closeModal.emit();
  }

  onSubmit() {
    if (this.userData) {
      this.saveChanges.emit(this.userData);
    }
  }
}
