import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementsFeedComponent } from './announcements-feed.component';

describe('AnnouncementsFeedComponent', () => {
  let component: AnnouncementsFeedComponent;
  let fixture: ComponentFixture<AnnouncementsFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementsFeedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnouncementsFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
