import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesTableComponent } from './activities-table.component';

describe('ActivitiesTableComponent', () => {
  let component: ActivitiesTableComponent;
  let fixture: ComponentFixture<ActivitiesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitiesTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivitiesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
