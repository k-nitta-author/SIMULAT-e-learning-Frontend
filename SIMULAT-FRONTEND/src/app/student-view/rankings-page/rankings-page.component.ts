import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardTableComponent } from './leaderboard-table/leaderboard-table.component';
import { RankingsService, TopStudent } from '../../backend-services/rankings.service';

@Component({
  selector: 'app-rankings-page',
  standalone: true,
  imports: [CommonModule, LeaderboardTableComponent],
  templateUrl: './rankings-page.component.html',
  styleUrl: './rankings-page.component.css'
})
export class RankingsPageComponent implements OnInit {
  topStudents: TopStudent[] = [];

  constructor(private rankingsService: RankingsService) {}

  ngOnInit() {
    this.loadTopStudents();
  }

  private loadTopStudents() {
    this.rankingsService.getTopStudents().subscribe(data => {
      this.topStudents = data;
    });
  }
}
