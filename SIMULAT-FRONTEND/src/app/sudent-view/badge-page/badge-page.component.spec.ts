import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgePageComponent } from './badge-page.component';

describe('BadgePageComponent', () => {
  let component: BadgePageComponent;
  let fixture: ComponentFixture<BadgePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BadgePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
