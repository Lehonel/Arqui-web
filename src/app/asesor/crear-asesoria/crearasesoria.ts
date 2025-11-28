import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-asesoria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crearasesoria.html',
  styleUrls: ['./crearasesoria.css']
})
export class CrearAsesoria implements OnInit {
  asesoria: any = {
    nombreasesoria: '',
    descripcionasesoria: '',
    costoasesoria: '',
    fechasesoria: '',
    urlimg: '',
    categoria: ''
  };

  temas: { nombreTema: string; descripcionTema: string }[] = [
    { nombreTema: '', descripcionTema: '' }
  ];

  asesorLogueado: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.obtenerAsesorLogueado();
  }

  //  Decodifica correctamente el token (maneja acentos)
  private decodeTokenPayload(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Error al decodificar el token:', e);
      return null;
    }
  }

  //  Corrige posibles errores de codificación de caracteres
  private fixEncoding(text: string): string {
    return text
      .replace(/Ã¡/g, 'á')
      .replace(/Ã©/g, 'é')
      .replace(/Ã­/g, 'í')
      .replace(/Ã³/g, 'ó')
      .replace(/Ãº/g, 'ú')
      .replace(/Ã±/g, 'ñ')
      .replace(/Ã/g, 'í');
  }

  //  Busca el asesor en la lista del backend por nombre
  private obtenerAsesorLogueado(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No se encontró sesión. Inicia sesión nuevamente.');
      return;
    }

    const payload = this.decodeTokenPayload(token);
    if (!payload || !payload.sub) {
      alert('Token inválido o corrupto. Inicia sesión nuevamente.');
      return;
    }

    // 🔤 Corrige el nombre decodificado (acentos)
    const nombreToken = this.fixEncoding(payload.sub.trim().toLowerCase());
    console.log(' Nombre decodificado del token:', nombreToken);

    this.http.get<any[]>('http://localhost:8080/api/skillink/asesor/listar').subscribe({
      next: (asesores) => {
        const asesorEncontrado = asesores.find(
          (a: any) => a.nombreasesor.trim().toLowerCase() === nombreToken
        );

        if (asesorEncontrado) {
          this.asesorLogueado = asesorEncontrado;
          console.log(' Asesor logueado encontrado:', asesorEncontrado);
        } else {
          alert('No se encontró información del asesor. Verifica el nombre en el token.');
        }
      },
      error: (err) => {
        console.error(' Error al obtener asesores:', err);
        alert('Hubo un error al buscar al asesor.');
      }
    });
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

  registrarAsesoria(): void {
    if (!this.asesoria.nombreasesoria || !this.asesoria.costoasesoria) {
      alert('Completa mínimo el nombre y el precio.');
      return;
    }

    if (!this.asesorLogueado) {
      alert('No se encontró información del asesor. Inicia sesión nuevamente.');
      return;
    }

    //  Creamos el objeto con el asesor incluido
    const asesoriaData = {
      ...this.asesoria,
      costoasesoria: Number(String(this.asesoria.costoasesoria).replace(',', '.')),
      asesor: this.asesorLogueado
    };

    console.log(' Datos enviados al backend:', asesoriaData);

    //  Sin headers, ya que el backend permite todas las rutas
    this.http
      .post('http://localhost:8080/api/skillink/asesoria/registrar', asesoriaData)
      .subscribe({
        next: (asesoriaResponse: any) => {
          console.log(' Asesoría registrada correctamente:', asesoriaResponse);

          alert('Asesoría creada correctamente.');
          this.router.navigate(['/asesor/asesorasesorias']);
        },
        error: (err) => {
          console.error(' Error al registrar la asesoría:', err);
          alert('Hubo un error al registrar la asesoría.');
        }
      });
  }
}
