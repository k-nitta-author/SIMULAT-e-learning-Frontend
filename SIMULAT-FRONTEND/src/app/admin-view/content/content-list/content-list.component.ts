import { Content, ContentService } from '../../../backend-services/content.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent implements OnInit {
  contentList: Content[] = []; // Store the list of content
  isModalOpen: boolean = false; // Track modal visibility

  newContent: Partial<Content> = {}; // Store new content temporarily for form

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.loadContent(); // Load content on initialization
  }

  // Load all content
  loadContent(): void {
    this.contentService.getAllContent().subscribe({
      next: (contents: Content[]) => {
        this.contentList = contents;
      },
      error: (error) => {
        console.error('Error loading content:', error);
      }
    });
  }

  // Toggle modal for adding content
  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
    if (!this.isModalOpen) {
      this.newContent = {}; // Reset the form on modal close
    }
  }

  // Submit new content
  onSubmit(): void {
    if (!this.newContent.content_title || !this.newContent.content_description) {
      alert('Please fill out all required fields.');
      return;
    }
    
    if (this.newContent.content_id) {
      // Update existing content
      this.contentService.updateContent(this.newContent.content_id, this.newContent as Content)
        .subscribe({
          next: (updatedContent) => {
            if (updatedContent) {
              const index = this.contentList.findIndex(
                content => content.content_id === updatedContent.content_id);
              if (index !== -1) {
                this.contentList[index] = updatedContent;
                this.toggleModal();
              }
            }
            this.toggleModal();
          },
          error: (error) => {
            console.error('Error updating content:', error);
          }
        });
    } else {
      // Add new content
      this.contentService.addContent(this.newContent as Content)
        .subscribe({
          next: (addedContent) => {
            this.contentList.push(addedContent);
            this.toggleModal();
          },
          error: (error) => {
            console.error('Error adding content:', error);
          }
        });
    }
  }

  // Edit content
  editContent(id: string): void {
    const contentToEdit = this.contentList.find(content => content.content_id === id);
    if (contentToEdit) {
      this.newContent = { ...contentToEdit }; // Load into form
      this.isModalOpen = true;
    }
  }

  // Delete content
  deleteContent(id: string): void {
    this.contentService.deleteContent(id).subscribe({
      next: () => {
        this.contentList = this.contentList.filter(content => content.content_id !== id);
      },
      error: (error) => {
        console.error('Error deleting content:', error);
      }
    });
  }
}

