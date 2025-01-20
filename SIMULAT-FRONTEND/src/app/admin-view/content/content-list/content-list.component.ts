import { Content, ContentService } from '../../../backend-services/content.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    this.contentService.getAllContent().subscribe((contents: Content[]) => {
      this.contentList = contents;
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

    this.contentService.addContent(this.newContent as Content).subscribe((addedContent) => {
      this.contentList.push(addedContent); // Add to list
      this.toggleModal(); // Close modal
    });
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
    this.contentService.deleteContent(id).subscribe(() => {
      this.contentList = this.contentList.filter(content => content.content_id !== id);
    });
  }
}
