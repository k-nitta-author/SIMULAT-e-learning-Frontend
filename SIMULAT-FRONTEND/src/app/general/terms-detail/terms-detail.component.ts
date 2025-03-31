import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TermsService } from '../../backend-services/terms.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

interface Term {
  id: number;
  school_year_start: string;
  school_year_end: string;
}

interface TermData {
  term: Term;
  quizzes: Quiz[];
  assignments: Assignment[];
  courses: Course[];
  content: Content[];
}

interface Quiz {
  id: number;
  content_id: number;
  quiz_title: string;
  description: string;
  time_limit: number;
  is_published: boolean;
}

interface Assignment {
  id: number;
  assignment_title: string;
  content_id: number;
  description: string;
  deadline: string;
  max_score: number;
  submission_format: string;
}

interface Course {
  id: number;
  course_code: string;
  course_name: string;
  description: string;
  instructor_id: number;
  is_published: boolean;
}

interface Content {
  id: number;
  type: string;
  title: string;
  description: string;
  url: string;
  course_id: number;
}

@Component({
  selector: 'app-terms-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './terms-detail.component.html',
  styleUrl: './terms-detail.component.css'
})
export class TermsDetailComponent implements OnInit {
  termData?: TermData;
  isInstructor: boolean = false;
  loading: boolean = true;
  error: string = '';
  showEditModal: boolean = false;
  editingTerm: {
    school_year_start: string;
    school_year_end: string;
  } = {
    school_year_start: '',
    school_year_end: ''
  };

  constructor(
    private termsService: TermsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isInstructor = localStorage.getItem('is_instructor') === 'true';
    const termId = this.route.snapshot.params['id'];
    
    if (termId) {
      this.termsService.getTermAllItems(termId).subscribe({
        next: (data) => {
          this.termData = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load term details';
          this.loading = false;
        }
      });
    }
  }

  onEdit(): void {
    if (this.termData?.term) {
      this.editingTerm = {
        school_year_start: this.termData.term.school_year_start,
        school_year_end: this.termData.term.school_year_end
      };
      this.showEditModal = true;
    }
  }

  closeModal(): void {
    this.showEditModal = false;
  }

  saveChanges(): void {
    if (this.termData?.term) {
      this.termsService.updateTerm(this.termData.term.id, this.editingTerm).subscribe({
        next: () => {
          this.showEditModal = false;
          // Refresh the data
          this.termsService.getTermAllItems(this.termData!.term.id).subscribe({
            next: (data) => {
              this.termData = data;
            },
            error: (err) => {
              this.error = 'Failed to refresh term details';
            }
          });
        },
        error: (err) => {
          this.error = 'Failed to update term';
        }
      });
    }
  }

  onDelete(): void {
    if (this.termData?.term && confirm('Are you sure you want to delete this term?')) {
      this.termsService.deleteTerm(this.termData.term.id).subscribe({
        next: () => {
          this.router.navigate(['/terms']);
        },
        error: (err) => {
          this.error = 'Failed to delete term';
        }
      });
    }
  }

  navigateToCourse(courseId: number): void {
    this.router.navigate(['/course-detail', courseId]);
  }

  navigateToQuiz(quizId: number): void {
    this.router.navigate(['/admin/quiz', quizId]);
  }

  navigateToAssignment(assignmentId: number): void {
    this.router.navigate(['/assignment', assignmentId]);
  }
}
