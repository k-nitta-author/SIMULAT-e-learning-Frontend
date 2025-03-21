import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyGroupPageComponent } from './study-group-page.component';

describe('StudyGroupPageComponent', () => {
  let component: StudyGroupPageComponent;
  let fixture: ComponentFixture<StudyGroupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyGroupPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudyGroupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
