import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-circle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-circle.component.html',
  styleUrl: './progress-circle.component.css',
})
export class ProgressCircleComponent {
  @Input() progress = 0;
  @Input() courseName = '';

  getProgressText(): string {
    return `${this.progress}%`;
  }

  getColorClass(): string {
    if (this.progress < 20) return 'less-complete';
    if (this.progress < 40) return 'med-low-complete';
    if (this.progress < 60) return 'med-complete';
    if (this.progress < 80) return 'med-high-complete';
    return 'more-complete';
  }
}
