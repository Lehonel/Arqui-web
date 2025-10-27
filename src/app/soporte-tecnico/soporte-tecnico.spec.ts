import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoporteTecnico } from './soporte-tecnico';

describe('SoporteTecnico', () => {
  let component: SoporteTecnico;
  let fixture: ComponentFixture<SoporteTecnico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoporteTecnico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoporteTecnico);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
