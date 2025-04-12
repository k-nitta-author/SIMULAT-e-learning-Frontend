import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminInfoViewComponent } from './admin-info-view/admin-info-view.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { EditProfileModalComponent } from './edit-profile-modal/edit-profile-modal.component';
import { StudentService, Student } from '../../backend-services/student.service';

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [
    CommonModule,
    AdminInfoViewComponent, 
    ProfileViewComponent, 
    EditProfileModalComponent
  ],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css'
})
export class AccountPageComponent implements OnInit {
  userId: string;
  isModalOpen = false;
  userData: Student | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {
    this.userId = this.route.snapshot.paramMap.get('id') || localStorage.getItem('user_id') || '';
  }

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    if (this.userId) {
      this.studentService.getStudent(this.userId).subscribe({
        next: (data) => {
          this.userData = data;
        },
        error: (error) => console.error('Error loading user data:', error)
      });
    }
  }

  openEditModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  handleSaveChanges(data: Student) {
    if (this.userId && data) {
      this.studentService.updateStudent(this.userId, data).subscribe({
        next: (updatedUser) => {
          this.userData = updatedUser;  // Directly update the local data with the response
          this.closeModal();
          // Remove the loadUserData() call since we already have the updated data
        },
        error: (error) => {
          console.error('Error updating user:', error);
          // Optionally refresh data on error to ensure consistency
          this.loadUserData();
        }
      });
    }
  }

  handleDeleteUser() {
    if (!this.userId) return;
    
    if (confirm('Are you sure you want to delete this account? This action cannot be undone.')) {
      this.studentService.deleteStudent(this.userId).subscribe({
        next: () => {
          localStorage.removeItem('token');
          localStorage.removeItem('user_id');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          alert('Failed to delete account. Please try again.');
        }
      });
    }
  }
}
