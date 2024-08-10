import { TestBed } from '@angular/core/testing';

import { ATSServiceService } from './atsservice.service';

describe('ATSServiceService', () => {
  let service: ATSServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ATSServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
