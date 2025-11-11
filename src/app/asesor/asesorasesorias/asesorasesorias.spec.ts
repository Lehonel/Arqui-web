import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Asesorasesorias } from './asesorasesorias';

describe('Asesorasesorias', () => {
  let component: Asesorasesorias;
  let fixture: ComponentFixture<Asesorasesorias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Asesorasesorias]
    }).compileComponents();

    fixture = TestBed.createComponent(Asesorasesorias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
