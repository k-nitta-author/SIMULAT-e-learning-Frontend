import { Component, OnInit } from '@angular/core';
import { BadgeService, Badge } from '../../backend-services/badge.service';

@Component({
  selector: 'app-badge-list',
  standalone: true,
  imports: [],
  templateUrl: './badge-list.component.html',
  styleUrl: './badge-list.component.css'
})
export class BadgeListComponent implements OnInit {
  badges: Badge[] = [];

  constructor(private badgeService: BadgeService) {}

  ngOnInit() {
    this.loadBadges();
  }

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
  }
