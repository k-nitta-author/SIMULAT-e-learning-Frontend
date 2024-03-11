import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradebookTableViewComponent } from './gradebook-table-view.component';

describe('GradebookTableViewComponent', () => {
  let component: GradebookTableViewComponent;
  let fixture: ComponentFixture<GradebookTableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradebookTableViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GradebookTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
