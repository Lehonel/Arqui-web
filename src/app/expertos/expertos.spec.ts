import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Expertos } from './expertos';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CartillaAsesorService } from './cartillaasesor.service';

describe('Expertos', () => {
  let component: Expertos;
  let fixture: ComponentFixture<Expertos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, Expertos],
      providers: [CartillaAsesorService]
    }).compileComponents();

    fixture = TestBed.createComponent(Expertos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the Expertos component', () => {
    expect(component).toBeTruthy();
  });
});
