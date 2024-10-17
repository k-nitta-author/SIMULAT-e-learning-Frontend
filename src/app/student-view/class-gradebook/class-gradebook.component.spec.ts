import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassGradebookComponent } from './class-gradebook.component';

describe('ClassGradebookComponent', () => {
  let component: ClassGradebookComponent;
  let fixture: ComponentFixture<ClassGradebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassGradebookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassGradebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
