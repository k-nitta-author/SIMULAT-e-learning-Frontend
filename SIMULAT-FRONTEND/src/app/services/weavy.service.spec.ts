import { TestBed } from '@angular/core/testing';

import { WeavyService } from './weavy.service';

describe('WeavyService', () => {
  let service: WeavyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeavyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
