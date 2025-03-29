import { Content, ContentService } from '../../../backend-services/content.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ExternalLinkDirective } from '../../../shared/directives/external-link.directive';

@Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ExternalLinkDirective],
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent implements OnInit {
  contentList: Content[] = []; // Store the list of content
  isModalOpen: boolean = false; // Track modal visibility
  isLoading: boolean = true;
  error: string | null = null;
  isEditing: boolean = false;
  editingId: number | null = null;

  newContent: Omit<Content, 'id' | 'created_at'> = {
    content_title: '',
    content_description: '',
    content_url: '',
    content_type: '',
    course_id: 0
  }; // Store new content temporarily for form

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.loadContent(); // Load content on initialization
  }

  // Load all content
  loadContent(): void {
    this.isLoading = true;
    this.error = null;
    console.log('Fetching content...');
    
    this.contentService.getAllContent().subscribe({
      next: (contents: Content[]) => {
        console.log('Received content:', contents);
        this.contentList = contents;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading content:', error);
        this.error = 'Failed to load content. Please try again.';
        this.isLoading = false;
      }
    });
  }

  // Toggle modal for adding content
  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
    if (!this.isModalOpen) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.newContent = {
      content_title: '',
      content_description: '',
      content_url: '',
      content_type: '',
      course_id: 0
    };
    this.isEditing = false;
    this.editingId = null;
  }

  // Submit new content
  onSubmit(): void {
    if (!this.newContent.content_title || !this.newContent.content_description || !this.newContent.course_id) {
      alert('Please fill out all required fields.');
      return;
    }
    
    if (this.isEditing && this.editingId) {
      this.contentService.updateContent(this.editingId, this.newContent)
        .subscribe({
          next: (updatedContent) => {
            const index = this.contentList.findIndex(c => c.id === this.editingId);
            if (index !== -1) {
              this.contentList[index] = updatedContent;
            }
            this.toggleModal();
          },
          error: (error) => console.error('Error updating content:', error)
        });
    } else {
      this.contentService.createContent(this.newContent)
        .subscribe({
          next: (addedContent) => {
            this.contentList.push(addedContent);
            this.toggleModal();
          },
          error: (error) => console.error('Error adding content:', error)
        });
    }
  }

  // Edit content
  editContent(id: number): void {
    const contentToEdit = this.contentList.find(content => content.id === id);
    if (contentToEdit) {
      this.newContent = {
        content_title: contentToEdit.content_title,
        content_description: contentToEdit.content_description,
        content_url: contentToEdit.content_url,
        content_type: contentToEdit.content_type,
        course_id: contentToEdit.course_id
      };
      this.isEditing = true;
      this.editingId = id;
      this.isModalOpen = true;
    }
  }

  // Delete content
  deleteContent(id: number): void {
    this.contentService.deleteContent(id).subscribe({
      next: () => {
        this.contentList = this.contentList.filter(content => content.id !== id);
      },
      error: (error) => {
        console.error('Error deleting content:', error);
      }
    });
  }

  ensureHttps(url: string): string {
    if (!url) return '';
    // Check if URL is already absolute
    if (url.match(/^https?:\/\//i)) {
      return url;
    }
    // Add https:// to make it absolute
    return `https://${url}`;
  }

  formatDisplayUrl(url: string): string {
    if (!url) return '';
    // Remove protocol and trailing slashes
    return url.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '');
  }
}

