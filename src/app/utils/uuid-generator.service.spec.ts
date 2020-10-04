import { TestBed } from '@angular/core/testing';

import { UuidGeneratorService } from './uuid-generator.service';

describe('UuidGeneratorService', () => {
  let service: UuidGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UuidGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
