import { Component, OnInit } from '@angular/core';
import { Challenge } from '../interfaces/challenge';
import { ChallengeService } from '../../backend-services/challenge.service';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-challenge-page',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, FormsModule, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './challenge-page.component.html',
  styleUrl: './challenge-page.component.css',
  providers: [ChallengeService]
})
export class ChallengePageComponent implements OnInit {
  challenges: Challenge[] = [];
  showCreateForm = false;
  challengeForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  showToast = false;
  toastMessage = '';
  toastType = '';
  editingId: number | null = null;
  editForm: Partial<Challenge> = {};
  hasEditPermission: boolean = false;

  constructor(
    private challengeService: ChallengeService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.challengeForm = this.fb.group({
      content_id: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      is_published: [false],
      publication_date: ['']
    });
  }

  ngOnInit(): void {
    this.loadChallenges();
    this.checkUserPermissions();
  }

  checkUserPermissions(): void {
    const isAdmin = localStorage.getItem('is_admin') === 'true';
    const isInstructor = localStorage.getItem('is_instructor') === 'true';
    const isSuperAdmin = localStorage.getItem('is_super_admin') === 'true';
    this.hasEditPermission = isAdmin || isInstructor || isSuperAdmin;
  }

  loadChallenges(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.challengeService.getAllChallenges().subscribe({
      next: (challenges) => {
        this.challenges = challenges;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load challenges. Please try again.';
        this.isLoading = false;
        this.showNotification(this.errorMessage, 'error');
      }
    });
  }

  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
  }

  showNotification(message: string, type: 'success' | 'error'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }

  createChallenge(): void {
    if (this.challengeForm.valid) {
      this.isLoading = true;
      const challengeData: Omit<Challenge, 'id' | 'created_at' | 'updated_at'> = {
        content_id: this.challengeForm.value.content_id,
        title: this.challengeForm.value.title,
        description: this.challengeForm.value.description,
        is_published: this.challengeForm.value.is_published,
        publication_date: this.challengeForm.value.publication_date
      };

      this.challengeService.addChallenge(challengeData).subscribe({
        next: () => {
          this.showNotification('Challenge created successfully!', 'success');
          this.loadChallenges();
          this.showCreateForm = false;
          this.challengeForm.reset();
          this.isLoading = false;
        },
        error: (error) => {
          this.showNotification('Failed to create challenge', 'error');
          this.isLoading = false;
        }
      });
    } else {
      this.showNotification('Please fill all required fields', 'error');
    }
  }

  deleteChallenge(id: number): void {
    if (confirm('Are you sure you want to delete this challenge?')) {
      this.isLoading = true;
      this.challengeService.deleteChallenge(id).subscribe({
        next: () => {
          this.showNotification('Challenge deleted successfully', 'success');
          this.loadChallenges();
        },
        error: (error) => {
          this.showNotification('Failed to delete challenge', 'error');
          this.isLoading = false;
        }
      });
    }
  }

  togglePublish(challenge: Challenge): void {
    // TODO: Implement publish functionality
    this.showNotification('Publish feature coming soon', 'success');
  }

  startEdit(challenge: Challenge): void {
    this.editingId = challenge.id;
    this.editForm = { ...challenge };
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editForm = {};
  }

  saveEdit(): void {
    if (!this.editingId || !this.editForm) return;

    this.isLoading = true;
    this.challengeService.updateChallenge(this.editingId, this.editForm).subscribe({
      next: () => {
        this.showNotification('Challenge updated successfully', 'success');
        this.loadChallenges();
        this.editingId = null;
        this.editForm = {};
      },
      error: (error) => {
        this.showNotification('Failed to update challenge', 'error');
        this.isLoading = false;
      }
    });
  }

  openCreateModal(): void {
    this.challengeForm.reset();
    this.showCreateForm = true;
  }
}

