import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ContentService, Content } from '../../backend-services/content.service';

@Component({
  selector: 'app-content-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.css']
})
export class ContentDetailComponent implements OnInit {
  content: Content | null = null;
  loading = false;
  error: string | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loading = true;
      this.error = null;
      
      this.contentService.getContentById(id).subscribe({
        next: (content) => {
          this.content = content;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Error loading content. Please try again later.';
          this.loading = false;
          console.error('Error fetching content:', error);
        }
      });
    }
  }
}
