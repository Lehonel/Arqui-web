import { TestBed } from '@angular/core/testing';

import { VerAsesoria } from './ver-asesoria';

describe('VerAsesoria', () => {
  let service: VerAsesoria;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerAsesoria);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
