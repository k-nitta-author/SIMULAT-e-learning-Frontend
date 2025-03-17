import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudyGroupService, StudyGroup } from '../../backend-services/study-group.service';

interface NewStudyGroup {
  course_id: number;
  max_members: number;
  name: string;
}

@Component({
  selector: 'app-study-group-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './study-group-page.component.html',
  styleUrl: './study-group-page.component.css'
})
export class StudyGroupPageComponent implements OnInit {
  studyGroups: StudyGroup[] = [];
  showCreateForm = false;
  newGroup: NewStudyGroup = {
    course_id: 1,
    max_members: 10,
    name: ''
  };

  constructor(
    private studyGroupService: StudyGroupService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadStudyGroups();
  }

  loadStudyGroups() {
    this.studyGroupService.getStudyGroups().subscribe(groups => {
      this.studyGroups = groups;
    });
  }

  viewDetails(id: number) {
    this.router.navigate(['/study-group', id]);
  }

  deleteGroup(id: number) {
    if (confirm('Are you sure you want to delete this study group?')) {
      this.studyGroupService.deleteStudyGroup(id).subscribe(() => {
        this.loadStudyGroups();
      });
    }
  }

  createNewGroup() {
    this.studyGroupService.createStudyGroup(this.newGroup as StudyGroup).subscribe({
      next: (group) => {
        this.loadStudyGroups();
        this.showCreateForm = false;
        this.newGroup = {
          course_id: 1,
          max_members: 10,
          name: ''
        };
      },
      error: (error) => {
        console.error('Error creating group:', error);
      }
    });
  }
}
