import { Component, OnInit } from '@angular/core';
import { BadgeService, Badge } from '../../backend-services/badge.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const DEFAULT_BADGE: Badge = {
  id: 0,
  name: '',
  description: '',
  pts_required: 0
};

@Component({
  selector: 'app-badge-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './badge-list.component.html',
  styleUrl: './badge-list.component.css'
})
export class BadgeListComponent implements OnInit {
  badges: Badge[] = [];
  editingBadge: Badge = { ...DEFAULT_BADGE };
  isEditing: boolean = false;
  selectedBadgeId: number | null = null;

  constructor(private badgeService: BadgeService) {}

  /**
   * Lifecycle hook that is called after data-bound properties are initialized
   * Loads initial badge data when component starts
   */
  ngOnInit() {
    this.loadBadges();
  }

  /**
   * Fetches all badges from the backend service
   * Updates the badges array with the response
   */
  loadBadges() {
    this.badgeService.getAllBadges().subscribe({
      next: (response) => {
        this.badges = response;
      },
      error: (error) => {
        console.error('Error fetching badges', error);
      }
    });
  }

  /**
   * Deletes a badge with the specified ID
   * Reloads the badge list after successful deletion
   * @param id - The ID of the badge to delete
   */
  deleteBadge(id: number) {
    this.badgeService.deleteBadge(id).subscribe({
      next: (response) => {
        console.log('Badge deleted successfully', response);
        this.loadBadges(); // Refresh the list after deletion
      },
      error: (error) => {
        console.error('Error deleting badge', error);
      }
    });
  }

  /**
   * Initiates editing mode for a specific badge
   * Copies badge data to editingBadge to prevent direct modification
   * @param badge - The badge object to edit
   */
  startEdit(badge: Badge) {
    this.editingBadge = { ...badge };
    this.selectedBadgeId = badge.id;
    this.isEditing = true;
  }

  /**
   * Cancels the current editing operation
   * Resets the editing form to default values
   */
  cancelEdit() {
    this.editingBadge = { ...DEFAULT_BADGE };
    this.selectedBadgeId = null;
    this.isEditing = false;
  }

  /**
   * Initiates the creation of a new badge
   * Sets up the editing form with default values
   * Uses special ID (-1) to indicate new badge creation
   */
  createNewBadge() {
    this.editingBadge = { ...DEFAULT_BADGE };
    this.selectedBadgeId = -1; // Special ID for new badge
    this.isEditing = true;
  }

  /**
   * Saves the current badge being edited
   * Creates new badge if selectedBadgeId is -1
   * Updates existing badge if selectedBadgeId matches an existing badge
   * Reloads badge list after successful operation
   */
  saveBadge() {
    if (this.selectedBadgeId === -1) {
      // Create new badge
      this.badgeService.createBadge(this.editingBadge).subscribe({
        next: (response) => {
          console.log('Badge created successfully', response);
          this.loadBadges();
          this.cancelEdit();
        },
        error: (error) => {
          console.error('Error creating badge', error);
        }
      });
    } else {
      // Update existing badge
      this.badgeService.updateBadge(this.editingBadge.id, this.editingBadge).subscribe({
        next: (response) => {
          console.log('Badge updated successfully', response);
          this.loadBadges();
          this.cancelEdit();
        },
        error: (error) => {
          console.error('Error updating badge', error);
        }
      });
    }
  }
}
