import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Challenge } from '../interfaces/challenge';
import { ChallengeService } from '../../backend-services/challenge.service';
import { NgIf, DatePipe } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-challenge-detail-page',
  standalone: true,
  imports: [NgIf, DatePipe],
  templateUrl: './challenge-detail-page.component.html',
  styleUrl: './challenge-detail-page.component.css'
})
export class ChallengeDetailPageComponent implements OnInit {
  challenge?: Challenge;
  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private challengeService: ChallengeService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.loadChallenge();
  }

  loadChallenge(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isLoading = true;
      this.challengeService.getChallengeById(Number(id)).subscribe({
        next: (challenge) => {
          this.challenge = challenge;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load challenge details';
          this.isLoading = false;
        }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
