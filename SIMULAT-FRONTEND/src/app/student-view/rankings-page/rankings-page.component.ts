import { Component } from '@angular/core';


import { LeaderboardTableComponent } from './leaderboard-table/leaderboard-table.component';

@Component({
  selector: 'app-rankings-page',
  standalone: true,
  imports: [LeaderboardTableComponent],
  templateUrl: './rankings-page.component.html',
  styleUrl: './rankings-page.component.css'
})
export class RankingsPageComponent {

}
