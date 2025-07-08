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
  isLoading: boolean = true;
  error: string | null = null;
  isEditing: boolean = false;
  editingId: number | null = null;

  newContent: Omit<Content, 'id' | 'created_at' | 'course' | 'term' | 'lesson_materials'> = {
    title: '',
    description: '',
    url: '',
    type: '',
    course_id: 0,
    term_id: 0
  }; // Store new content temporarily for form

  // File management state
  fileList: string[] = [];
  fileError: string | null = null;
  isFileLoading: boolean = false;
  selectedFile: File | null = null;
  isUploading: boolean = false;
  uploadProgress: number = 0;

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.loadContent(); // Load content on initialization
    this.loadFiles();   // Load files on initialization
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
      title: '',
      description: '',
      url: '',
      type: '',
      course_id: 0,
      term_id: 0
    };
    this.isEditing = false;
    this.editingId = null;
  }

  // Submit new content
  onSubmit(): void {
    if (!this.newContent.title || !this.newContent.description || !this.newContent.course_id || !this.newContent.term_id) {
      alert('Please fill out all required fields.');
      return;
    }
    
    if (this.isEditing && this.editingId) {
      this.contentService.updateContent(this.editingId, {
        ...this.newContent,
        created_at: new Date().toISOString() // Add created_at as required by the API
      })
        .subscribe({
          next: () => {
            this.toggleModal();
            this.loadContent(); // Refresh the list
          },
          error: (error) => {
            console.error('Error updating content:', error);
            alert('Failed to update content. Please try again.');
          }
        });
    } else {
      this.contentService.createContent(this.newContent)
        .subscribe({
          next: () => {
            this.toggleModal();
            this.loadContent(); // Refresh the list
          },
          error: (error) => {
            console.error('Error adding content:', error);
            alert('Failed to add content. Please try again.');
          }
        });
    }
  }

  // Edit content
  editContent(id: number): void {
    const contentToEdit = this.contentList.find(content => content.id === id);
    if (contentToEdit) {
      this.newContent = {
        title: contentToEdit.title,
        description: contentToEdit.description,
        url: contentToEdit.url,
        type: contentToEdit.type,
        course_id: contentToEdit.course_id,
        term_id: contentToEdit.term_id
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

  // --- File Management Methods ---

  loadFiles(): void {
    this.isFileLoading = true;
    this.fileError = null;
    // Replace with your backend service call
    this.contentService.getFiles().subscribe({
      next: (files: string[]) => {
        this.fileList = files;
        this.isFileLoading = false;
      },
      error: (err) => {
        this.fileError = 'Failed to load files.';
        this.isFileLoading = false;
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadFile(): void {
    if (!this.selectedFile) return;
    this.isUploading = true;
    this.uploadProgress = 0;
    this.fileError = null;
    this.contentService.uploadFile(this.selectedFile).subscribe({
      next: (event: any) => {
        if (event.type === 'progress') {
          this.uploadProgress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === 'response') {
          this.isUploading = false;
          this.selectedFile = null;
          this.loadFiles();
        }
      },
      error: (err) => {
        this.fileError = 'File upload failed.';
        this.isUploading = false;
      }
    });
  }

  downloadFile(filename: string): void {
    this.contentService.downloadFile(filename).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => {
        this.fileError = 'Failed to download file.';
      }
    });
  }

  ensureHttps(url: string | undefined): string {
    if (!url) return '';
    // Check if valid URL
    try {
      const urlObj = new URL(url);
      return urlObj.toString();
    } catch {
      // If not a valid URL, try adding https://
      try {
        const urlObj = new URL(`https://${url}`);
        return urlObj.toString();
      } catch {
        return '';
      }
    }
  }

  formatDisplayUrl(url: string | undefined): string {
    if (!url) return '';
    try {
      const urlObj = new URL(url);
      return urlObj.hostname + urlObj.pathname;
    } catch {
      return url;
    }
  }

  getTitle(content: Content): string {
    return content.title || content.content_title || '';
  }

  getDescription(content: Content): string {
    return content.description || content.content_description || '';
  }

  getUrl(content: Content): string {
    return content.url || content.content_url || '';
  }
}

