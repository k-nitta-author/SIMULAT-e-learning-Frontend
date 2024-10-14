import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDeleteComponent } from './student-delete.component';

describe('StudentDeleteComponent', () => {
  let component: StudentDeleteComponent;
  let fixture: ComponentFixture<StudentDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
