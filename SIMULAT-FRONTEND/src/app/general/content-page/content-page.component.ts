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

    // --- File Widget State ---
    files: string[] = [];
    filesLoading: boolean = true;
    filesError: string | null = null;

    constructor(private contentService: ContentService) {}

    ngOnInit() {
        this.loadContent();
        this.loadFiles();
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

    // --- File Widget Logic ---
    loadFiles() {
        this.filesLoading = true;
        this.filesError = null;
        // For demonstration, use mock/test files
        setTimeout(() => {
            this.files = [
                'test-document.pdf',
                'sample-image.png',
                'presentation.pptx',
                'notes.txt'
            ];
            this.filesLoading = false;
        }, 500);
        // Uncomment below for real API usage:
        /*
        this.contentService.getFiles().subscribe({
            next: (data) => {
                this.files = data;
                this.filesLoading = false;
            },
            error: (error) => {
                this.filesError = 'Failed to load files.';
                this.filesLoading = false;
            }
        });
        */
    }

    ensureHttps(url: string): string {
        if (!url) return '';
        try {
            const urlObj = new URL(url);
            return urlObj.toString();
        } catch {
            try {
                const urlObj = new URL(`https://${url}`);
                return urlObj.toString();
            } catch {
                return '';
            }
        }
    }

    // --- File Download Helper ---
    downloadFile(filename: string) {
        // For demonstration, just alert
        alert(`Pretend downloading: ${filename}`);
        // Uncomment for real download:
        /*
        this.contentService.downloadFile(filename).subscribe(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
        });
        */
    }
}
