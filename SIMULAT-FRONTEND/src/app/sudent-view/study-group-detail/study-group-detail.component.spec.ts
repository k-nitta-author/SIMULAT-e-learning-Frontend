import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyGroupDetailComponent } from './study-group-detail.component';

describe('StudyGroupDetailComponent', () => {
  let component: StudyGroupDetailComponent;
  let fixture: ComponentFixture<StudyGroupDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyGroupDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudyGroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
