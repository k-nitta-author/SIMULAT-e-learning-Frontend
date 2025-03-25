import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivitiesPageComponent } from './activities-page.component';
import { ActivitiesService } from '../../general/services/activities.service';

describe('ActivitiesPageComponent', () => {
  let component: ActivitiesPageComponent;
  let fixture: ComponentFixture<ActivitiesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitiesPageComponent, HttpClientTestingModule],
      providers: [ActivitiesService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivitiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
