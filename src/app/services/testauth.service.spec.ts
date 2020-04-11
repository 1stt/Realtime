import { TestBed } from '@angular/core/testing';

import { TestauthService } from './testauth.service';

describe('TestauthService', () => {
  let service: TestauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
