import { Component } from '@angular/core';
import { BadgeService, Badge } from '../../backend-services/badge.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-badge',
  standalone: true,
  imports: [],
  templateUrl: './create-badge.component.html',
  styleUrl: './create-badge.component.css'
})
export class CreateBadgeComponent {
  badgeForm: FormGroup;

  constructor(private badgeService: BadgeService, private fb: FormBuilder) {
    this.badgeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      pts_required: [0, Validators.required]
    });
  }

  onSubmit() {
    if (this.badgeForm.valid) {
      const newBadge: Badge = this.badgeForm.value;
      this.badgeService.createBadge(newBadge).subscribe(response => {
        console.log('Badge created successfully', response);
        // Handle success, e.g., reset form or navigate away
      }, error => {
        console.error('Error creating badge', error);
        // Handle error
      });
    }
  }
}
