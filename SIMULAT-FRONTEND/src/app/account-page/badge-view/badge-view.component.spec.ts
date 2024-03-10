import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeViewComponent } from './badge-view.component';

describe('BadgeViewComponent', () => {
  let component: BadgeViewComponent;
  let fixture: ComponentFixture<BadgeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BadgeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
