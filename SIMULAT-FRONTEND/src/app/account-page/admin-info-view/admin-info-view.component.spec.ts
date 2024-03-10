import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInfoViewComponent } from './admin-info-view.component';

describe('AdminInfoViewComponent', () => {
  let component: AdminInfoViewComponent;
  let fixture: ComponentFixture<AdminInfoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminInfoViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminInfoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
