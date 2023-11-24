import { TestBed } from '@angular/core/testing';

import { SHA512Service } from './sha512.service';

describe('SHA512Service', () => {
  let service: SHA512Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SHA512Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
