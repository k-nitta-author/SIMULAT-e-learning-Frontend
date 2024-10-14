import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorDeleteComponent } from './instructor-delete.component';

describe('InstructorDeleteComponent', () => {
  let component: InstructorDeleteComponent;
  let fixture: ComponentFixture<InstructorDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
