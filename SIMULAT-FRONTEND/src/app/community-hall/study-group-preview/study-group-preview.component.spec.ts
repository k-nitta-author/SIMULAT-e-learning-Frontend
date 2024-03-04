import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyGroupPreviewComponent } from './study-group-preview.component';

describe('StudyGroupPreviewComponent', () => {
  let component: StudyGroupPreviewComponent;
  let fixture: ComponentFixture<StudyGroupPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyGroupPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudyGroupPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
