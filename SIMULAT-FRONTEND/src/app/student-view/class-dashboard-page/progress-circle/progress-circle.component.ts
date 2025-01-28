import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-circle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-circle.component.html',
  styleUrl: './progress-circle.component.css',

})
export class ProgressCircleComponent {

  progress = 100;

  progress_text = "asd";


  getProgressText(): string{
    return this.progress.toString() + " %";
  }

  getColorClass(): string{

    const colors=['less-complete', 'med-low-complete', 'med-complete', 'med-high-complete', 'more-complete'];

    const index = Math.floor(this.progress / (100/ colors.length));

    return colors[index] || colors[0]

  }


}
