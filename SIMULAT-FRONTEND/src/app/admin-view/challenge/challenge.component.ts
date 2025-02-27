import { Component, OnInit } from '@angular/core';
import { Challenge } from '../../general/interfaces/challenge'; 
import { ChallengeService } from '../../backend-services/challenge.service';
import { NgFor, NgIf, DatePipe, CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-challenge',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, CommonModule, FormsModule],
  templateUrl: './challenge.component.html',
  providers: [ChallengeService],
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  challenges: Challenge[] = [];
  isModalOpen: boolean = false;
  newChallenge: Partial<Challenge> = {};
  error: string | null = null;

  constructor(private challengeService: ChallengeService) {}

  ngOnInit(): void {
    this.loadChallenges();
  }

  loadChallenges(): void {
    this.challengeService.getAllChallenges().subscribe({
      next: (challenges: Challenge[]) => {
        this.challenges = challenges;
      },
      error: (error) => {
        console.error('Error loading challenges:', error);
        this.error = 'Failed to load challenges. Please try again later.';
      }
    });
  }

  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
    if (!this.isModalOpen) {
      this.newChallenge = {};
    }
  }

  onSubmit(): void {
    if (!this.newChallenge.content_id || !this.newChallenge.created_at) {
      alert('Please fill out all required fields.');
      return;
    }

    if (this.newChallenge.id) {
      this.challengeService.updateChallenge(this.newChallenge.id, this.newChallenge as Challenge)
        .subscribe({
          next: (updatedChallenge) => {
            if (updatedChallenge) {
              const index = this.challenges.findIndex(ch => ch.id === updatedChallenge.id);
              if (index !== -1) {
                this.challenges[index] = updatedChallenge;
                this.toggleModal();
              }
            }
          },
          error: (error) => {
            console.error('Error updating challenge:', error);
            this.error = 'Failed to update challenge. Please try again later.';
          }
        });
    } else {
      this.challengeService.addChallenge(this.newChallenge as Challenge)
        .subscribe({
          next: (addedChallenge) => {
            this.challenges.push(addedChallenge);
            this.toggleModal();
          },
          error: (error) => {
            console.error('Error adding challenge:', error);
            this.error = 'Failed to add challenge. Please try again later.';
          }
        });
    }
  }

  editChallenge(id: number): void {
    const challengeToEdit = this.challenges.find(ch => ch.id === id);
    if (challengeToEdit) {
      this.newChallenge = { ...challengeToEdit };
      this.isModalOpen = true;
    }
  }

  deleteChallenge(id: number): void {
    this.challengeService.deleteChallenge(id).subscribe({
      next: () => {
        this.challenges = this.challenges.filter(ch => ch.id !== id);
      },
      error: (error) => {
        console.error('Error deleting challenge:', error);
        this.error = 'Failed to delete challenge. Please try again later.';
      }
    });
  }
}

