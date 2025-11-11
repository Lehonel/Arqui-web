import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Homeasesor } from './homeasesor';

describe('Homeasesor', () => {
  let component: Homeasesor;
  let fixture: ComponentFixture<Homeasesor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Homeasesor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Homeasesor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
