import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashItemComponent } from './dash-item.component';

describe('DashItemComponent', () => {
  let component: DashItemComponent;
  let fixture: ComponentFixture<DashItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
