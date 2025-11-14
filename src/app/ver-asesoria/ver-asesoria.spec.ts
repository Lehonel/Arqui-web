import { ComponentFixture, TestBed } from '@angular/core/testing';

;
import { VerAsesoria } from "../asesor/ver-asesoria/ver-asesoria";

describe('VerAsesoria', () => {
  let component: VerAsesoria;
  let fixture: ComponentFixture<VerAsesoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerAsesoria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerAsesoria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
