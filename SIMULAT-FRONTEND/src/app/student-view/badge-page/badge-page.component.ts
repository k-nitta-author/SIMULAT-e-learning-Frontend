import { Component, OnInit } from '@angular/core';
import { BadgeService, Badge } from '../../backend-services/badge.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './badge-page.component.html',
  styleUrl: './badge-page.component.css'
})
export class BadgePageComponent implements OnInit {
  badges: Badge[] = [];

  constructor(private badgeService: BadgeService) { }

  ngOnInit(): void {
    this.badgeService.getAllBadges()
      .subscribe(badges => this.badges = badges);
  }
}

