import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsesoriaService } from './asesoria.service';

@Component({
  selector: 'app-tabla-asesorias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-asesorias.html',
  styleUrls: ['./tabla-asesorias.css']
})
export class TablaAsesoriasComponent implements OnInit {
  asesorias: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private asesoriaService: AsesoriaService) {}

  ngOnInit(): void {
    this.cargarAsesorias();
  }

  cargarAsesorias(): void {
    this.loading = true;
    this.asesoriaService.listarAsesorias().subscribe({
      next: (data) => {
        this.asesorias = data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar asesorías:', err);
        this.error = 'No se pudieron cargar las asesorías.';
        this.loading = false;
      }
    });
  }


  buscarPorId(id: number): void {
    if (!id) {
      alert('Ingrese un ID válido');
      return;
    }

    this.loading = true;
    this.asesoriaService.obtenerAsesoriaPorId(id).subscribe({
      next: (asesoria) => {
        this.asesorias = [asesoria];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se encontró una asesoría con ese ID.';
        this.loading = false;
      }
    });
  }

  buscarPorFecha(fecha: string): void {
    if (!fecha) {
      alert('Seleccione una fecha válida');
      return;
    }

    this.loading = true;
    this.asesoriaService.listarPorFecha(fecha).subscribe({
      next: (data) => {
        this.asesorias = data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al buscar asesorías por fecha:', err);
        this.error = 'No se encontraron asesorías en esa fecha.';
        this.loading = false;
      }
    });
  }

  eliminarAsesoria(id: number): void {
    if (confirm('¿Seguro que deseas eliminar esta asesoría?')) {
      this.asesoriaService.eliminarAsesoria(id).subscribe({
        next: () => {
          this.asesorias = this.asesorias.filter(a => a.idasesoria !== id);
        },
        error: (err) => {
          console.error('Error al eliminar asesoría:', err);
          alert('No se pudo eliminar la asesoría.');
        }
      });
    }
  }

  getImagenUrl(url: string): string {
    if (!url) return 'http://localhost:8080/Imagenes/default.jpg';

    let nombreArchivo = url.trim().replace(/\\/g, '/');
    nombreArchivo = nombreArchivo.split('/').pop() || nombreArchivo;

    return `http://localhost:8080/Imagenes/${nombreArchivo}`;
  }

}
