import { Component, OnInit } from '@angular/core';
import { ContentService, Content } from '../../../services/content.service';
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
  contentList: Content[] = []; // Array to store the list of content
  selectedContent: Content | null = null; // Store the selected content for editing
  newContent: Content = { 
    content_id: '', 
    course_id: '', 
    content_type: '', 
    content_title: '', 
    content_description: '', 
    content_url: '', 
    created_at: new Date() 
  }; // Object to store new content

  isModalOpen: boolean = false;

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.getContent();
  }

  // Fetch all content from the service
  getContent(): void {
    this.contentService.getAllContent().subscribe(
      (data: Content[]) => {
        this.contentList = data;
      },
      (error) => {
        console.error('Error fetching content', error);
      }
    );
  }

  // Handle opening the modal
  openModal(): void {
    this.selectedContent = null; // Clear selection if any
    this.isModalOpen = true; // Open the modal
  }

  // Handle closing the modal
  closeModal(): void {
    this.isModalOpen = false; // Close the modal
  }

  // Handle the selection of content for editing
  selectContent(content: Content): void {
    this.selectedContent = content;
    this.isModalOpen = true; // Open modal for editing
  }

  // Handle adding new content
  addContent(): void {
    this.contentService.addContent(this.newContent).subscribe(
      (data: Content) => {
        this.contentList.push(data); // Add the newly created content to the list
        this.newContent = { 
          content_id: '', 
          course_id: '', 
          content_type: '', 
          content_title: '', 
          content_description: '', 
          content_url: '', 
          created_at: new Date() 
        }; // Reset new content object
        this.closeModal(); // Close the modal after adding
      },
      (error) => {
        console.error('Error adding content', error);
      }
    );
  }

  // Handle updating existing content
  updateContent(): void {
    if (!this.selectedContent) return; // Ensure selected content is valid
    this.contentService.updateContent(this.selectedContent.content_id, this.selectedContent).subscribe(
      (data: Content | undefined) => {
        if (data) {
          const index = this.contentList.findIndex(item => item.content_id === data.content_id);
          if (index !== -1) {
            this.contentList[index] = data; // Update the content in the list
            this.closeModal(); // Close the modal after updating
          }
          this.selectedContent = null; // Clear selection after updating
        } else {
          console.error('Received undefined data');
        }
      },
      (error) => {
        console.error('Error updating content', error);
      }
    );
  }

  // Handle deleting content
  deleteContent(contentId: string): void {
    this.contentService.deleteContent(contentId).subscribe(
      () => {
        this.contentList = this.contentList.filter(item => item.content_id !== contentId); // Remove deleted content from the list
      },
      (error) => {
        console.error('Error deleting content', error);
      }
    );
  }
}
