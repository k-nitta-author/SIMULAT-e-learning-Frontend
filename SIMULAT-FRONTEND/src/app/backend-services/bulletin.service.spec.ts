import { TestBed } from '@angular/core/testing';

import { BulletinService } from './bulletin.service';

describe('BulletinService', () => {
  let service: BulletinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BulletinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
