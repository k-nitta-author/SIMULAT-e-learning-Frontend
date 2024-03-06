import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFilterBarComponent } from './course-filter-bar.component';

describe('CourseFilterBarComponent', () => {
  let component: CourseFilterBarComponent;
  let fixture: ComponentFixture<CourseFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseFilterBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
