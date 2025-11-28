import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-crear-asesor',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './crear-asesor.html',
  styleUrl: './crear-asesor.css',
})
export class CrearAsesor implements OnInit {
  asesor: any = {
    nombrecartillaasesor: '',
    descripcioncartillaasesor: '',
    especialcartillaasesor: '',
    urlcartillaasesor: '',
  };

  temas: { nombreTema: string; descripcionTema: string }[] = [
    { nombreTema: '', descripcionTema: '' }
  ];

  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.verificarSesion();
  }

  // Verifica que haya sesión activa
  private verificarSesion(): void {
    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('rol');

    if (!token || rol !== 'ASESOR') {
      alert('Debes iniciar sesión como asesor para acceder a esta página.');
      this.router.navigate(['/']);
    }
  }

  agregarTema(): void {
    this.temas.push({ nombreTema: '', descripcionTema: '' });
  }

  eliminarTema(index: number): void {
    if (this.temas.length === 1) {
      this.temas = [{ nombreTema: '', descripcionTema: '' }];
      return;
    }
    this.temas.splice(index, 1);
  }

  registrarCartilla(): void {
    // Validaciones básicas
    if (!this.asesor.nombrecartillaasesor.trim()) {
      this.error = 'El nombre es obligatorio.';
      return;
    }

    if (!this.asesor.especialcartillaasesor.trim()) {
      this.error = 'La especialidad es obligatoria.';
      return;
    }

    this.loading = true;
    this.error = null;

    // Creamos el objeto de la cartilla
    const cartillaData = {
      nombrecartillaasesor: this.asesor.nombrecartillaasesor,
      descripcioncartillaasesor: this.asesor.descripcioncartillaasesor,
      especialcartillaasesor: this.asesor.especialcartillaasesor,
      urlcartillaasesor: this.asesor.urlcartillaasesor
    };

    console.log(' Datos enviados:', cartillaData);

    //  ENDPOINT CORRECTO: /registrarcartilla
    this.http
      .post('http://localhost:8080/api/skillink/cartillaasesor/registrarcartilla', cartillaData)
      .subscribe({
        next: (response: any) => {
          console.log('Cartilla registrada:', response);
          alert('Cartilla de asesor creada correctamente.');
          this.router.navigate(['/asesor/asesorasesorias']);
          this.loading = false;
        },
        error: (err) => {
          console.error('Error:', err);
          this.error = 'Hubo un error al registrar la cartilla.';
          this.loading = false;
        }
      });
  }

  cancelar(): void {
    this.router.navigate(['/asesor/asesorasesorias']);
  }
}
