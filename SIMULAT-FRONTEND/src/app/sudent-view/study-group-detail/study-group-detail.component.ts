import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface GroupMember {
  id: number;
  name: string;
  role?: string;
  avatar?: string;
}

@Component({
  selector: 'app-study-group-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './study-group-detail.component.html',
  styleUrl: './study-group-detail.component.css'
})
export class StudyGroupDetailComponent {
  members: GroupMember[] = [
    { id: 1001, name: 'John Doe', role: 'Leader', avatar: 'assets/avatars/john.jpg' },
    { id: 1002, name: 'Jane Smith', role: 'Member', avatar: 'assets/avatars/jane.jpg' },
    { id: 1003, name: 'Mike Johnson', role: 'Member', avatar: 'assets/avatars/mike.jpg' }
  ];
}
