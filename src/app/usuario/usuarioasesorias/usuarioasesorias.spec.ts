import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuarioAsesorias } from './usuarioasesorias';

describe('UsuarioAsesorias', () => {
  let component: UsuarioAsesorias;
  let fixture: ComponentFixture<UsuarioAsesorias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioAsesorias]
    }).compileComponents();

    fixture = TestBed.createComponent(UsuarioAsesorias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
