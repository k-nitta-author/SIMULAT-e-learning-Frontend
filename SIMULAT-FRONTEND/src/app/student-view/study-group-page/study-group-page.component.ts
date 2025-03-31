import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StudyGroupService, StudyGroup } from '../../backend-services/study-group.service';

@Component({
  selector: 'app-study-group-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './study-group-page.component.html',
  styleUrl: './study-group-page.component.css'
})
export class StudyGroupPageComponent implements OnInit {
  studyGroups: StudyGroup[] = [];
  showCreateForm = false;
  newGroup: StudyGroup = {
    name: '',
    course_id: 1,
    max_members: 10,
    courses: [],
    memberships: [],
    id: 0
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
          name: '',
          id: 0,
          course_id: 1,
          max_members: 10,
          courses: [],
          memberships: []
        };
      },
      error: (error) => {
        console.error('Error creating group:', error);
      }
    });
  }
}
