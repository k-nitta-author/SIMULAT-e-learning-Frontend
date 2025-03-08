import { Component, OnInit } from '@angular/core';
import { Challenge } from '../interfaces/challenge';
import { ChallengeService } from '../../backend-services/challenge.service';
import { NgFor, NgIf, DatePipe } from '@angular/common';

@Component({
  selector: 'app-challenge-page',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe],
  templateUrl: './challenge-page.component.html',
  styleUrl: './challenge-page.component.css',
  providers: [ChallengeService]
})
export class ChallengePageComponent implements OnInit {

  challenges: Challenge[] = [];

  constructor(private challengeService: ChallengeService) { }

  ngOnInit(): void {
    this.challengeService.getAllChallenges().subscribe(challenges => this.challenges = challenges);
  }

}

