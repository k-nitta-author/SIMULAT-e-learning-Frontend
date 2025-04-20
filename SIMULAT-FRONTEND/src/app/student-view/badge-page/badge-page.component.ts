import { Component, OnInit } from '@angular/core';
import { BadgeService, Badge } from '../../backend-services/badge.service';
import { StudentService, Student } from '../../backend-services/student.service';
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
  userProgressScore: number = 0;

  constructor(
    private badgeService: BadgeService,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.studentService.getStudent(userId).subscribe(
        (student: Student) => {
          this.userProgressScore = student.overall_progress;
          this.loadBadges();
        }
      );
    }
  }

  loadBadges(): void {
    this.badgeService.getAllBadges()
      .subscribe(badges => {
        this.badges = badges.map(badge => ({
          ...badge,
          earned: this.userProgressScore >= badge.pts_required
        }));
      });
  }

  isBadgeEarned(badge: Badge): boolean {
    return this.userProgressScore >= badge.pts_required;
  }

  getNextBadgeThreshold(): number {
    const nextBadge = this.badges
      .filter(badge => badge.pts_required > this.userProgressScore)
      .sort((a, b) => a.pts_required - b.pts_required)[0];
    return nextBadge ? nextBadge.pts_required : this.userProgressScore;
  }
}

