import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ContentService, Content } from '../../backend-services/content.service';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-content-page',
    standalone: true,
    imports: [HttpClientModule, NgFor, NgIf, DatePipe, RouterModule],
    providers: [ContentService],
    templateUrl: './content-page.component.html',
    styleUrl: './content-page.component.css'
})
export class ContentPageComponent implements OnInit {
    contents: Content[] = [];
    isLoading: boolean = true;
    error: string | null = null;

    constructor(private contentService: ContentService) {}

    ngOnInit() {
        this.loadContent();
    }

    loadContent() {
        this.isLoading = true;
        this.contentService.getAllContent().subscribe({
            next: (data) => {
                this.contents = data;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading content:', error);
                this.error = 'Failed to load content. Please try again.';
                this.isLoading = false;
            }
        });
    }
}
