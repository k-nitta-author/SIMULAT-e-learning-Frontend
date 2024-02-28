import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassDashboardPageComponent } from './class-dashboard-page.component';

describe('ClassDashboardPageComponent', () => {
  let component: ClassDashboardPageComponent;
  let fixture: ComponentFixture<ClassDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassDashboardPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
