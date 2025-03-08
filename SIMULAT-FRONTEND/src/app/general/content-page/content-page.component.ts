import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ContentService, Content } from '../../backend-services/content.service';
import { NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-content-page',
  standalone: true,
  imports: [HttpClientModule, NgFor, NgIf],
  providers: [ContentService],
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.css'
})
export class ContentPageComponent implements OnInit {
    contents: Content[] = [];

    constructor(private contentService: ContentService) { 
    }

    ngOnInit() {
        this.contentService.getAllContent().subscribe(data => {
            this.contents = data;
        });
    }
}
