import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyGroupSectionComponent } from './study-group-section.component';

describe('StudyGroupSectionComponent', () => {
  let component: StudyGroupSectionComponent;
  let fixture: ComponentFixture<StudyGroupSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyGroupSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudyGroupSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
