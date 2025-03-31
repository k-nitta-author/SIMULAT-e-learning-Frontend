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

  getColorClass(): string{

    const colors=['less-complete', 'med-low-complete', 'med-complete', 'med-high-complete', 'more-complete'];

    const index = Math.floor(this.progress / (100/ colors.length));

    return colors[index] || colors[0]

  }


}
