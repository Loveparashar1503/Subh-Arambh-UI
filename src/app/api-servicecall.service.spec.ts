import { TestBed } from '@angular/core/testing';

import { ApiServicecallService } from './api-servicecall.service';

describe('ApiServicecallService', () => {
  let service: ApiServicecallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServicecallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
