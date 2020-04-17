import { TestBed } from '@angular/core/testing';

import { TestdateService } from './testdate.service';

describe('TestdateService', () => {
  let service: TestdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
