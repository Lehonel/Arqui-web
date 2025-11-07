import { TestBed } from '@angular/core/testing';

import {PreAsesoria } from './asesoria';
import {Asesorias} from '../asesorias/asesorias';

describe('Asesoria', () => {
  let service: Asesorias;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Asesorias);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
