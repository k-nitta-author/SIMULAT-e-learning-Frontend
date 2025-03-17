import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StudyGroupService, StudyGroup, JoinGroupResponse } from '../../backend-services/study-group.service';

@Component({
  selector: 'app-study-group-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './study-group-detail.component.html',
  styleUrl: './study-group-detail.component.css'
})
export class StudyGroupDetailComponent implements OnInit {
  studyGroup: StudyGroup | null = null;
  joinMessage: string = '';
  errorMessage: string = '';
  currentStudentId: number = Number(localStorage.getItem('user_id'));
  isEditing = false;
  editForm = {
    name: '',
    max_members: 0
  };

  constructor(
    private route: ActivatedRoute,
    private studyGroupService: StudyGroupService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadStudyGroup(id);
  }

  loadStudyGroup(id: number) {
    this.studyGroupService.getStudyGroupById(id).subscribe(group => {
      this.studyGroup = group;
    });
  }

  joinGroup() {
    if (this.studyGroup) {
      const joinData = {
        student_id: this.currentStudentId,
        is_leader: false // Set to true if needed for leader joining
      };

      this.studyGroupService.joinStudyGroup(this.studyGroup.id, joinData).subscribe({
        next: (response: JoinGroupResponse) => {
          this.joinMessage = response.message;
          this.loadStudyGroup(this.studyGroup!.id);
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Failed to join group';
        }
      });
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing && this.studyGroup) {
      this.editForm = {
        name: this.studyGroup.name,
        max_members: this.studyGroup.max_members
      };
    }
  }

  saveChanges() {
    if (this.studyGroup && this.editForm) {
      const updatedGroup = {
        ...this.studyGroup,
        name: this.editForm.name,
        max_members: this.editForm.max_members
      };

      this.studyGroupService.updateStudyGroup(this.studyGroup.id, updatedGroup).subscribe({
        next: () => {
          this.loadStudyGroup(this.studyGroup!.id);
          this.isEditing = false;
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Failed to update group';
        }
      });
    }
  }

  getMemberCount(): number {
    return this.studyGroup?.memberships?.length || 0;
  }

  isGroupFull(): boolean {
    if (!this.studyGroup) return true;
    return (this.studyGroup.memberships?.length || 0) >= (this.studyGroup.max_members || 0);
  }
}
