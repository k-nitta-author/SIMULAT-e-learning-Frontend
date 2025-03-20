import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RankingsPageComponent } from './rankings-page.component';
import { RankingsService } from '../../backend-services/rankings.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RankingsPageComponent', () => {
  let component: RankingsPageComponent;
  let fixture: ComponentFixture<RankingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingsPageComponent, HttpClientTestingModule],
      providers: [RankingsService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RankingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
