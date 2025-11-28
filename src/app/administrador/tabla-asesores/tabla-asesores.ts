import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsesorService } from './asesor.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-tabla-asesores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tabla-asesores.html',
  styleUrls: ['./tabla-asesores.css']
})
export class TablaAsesoresComponent implements OnInit {
  asesores: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private asesorService: AsesorService) {}

  ngOnInit() {
    const ordenGuardado = localStorage.getItem("ordenAsesores");

    if (ordenGuardado) {
      this.asesores = JSON.parse(ordenGuardado);
      this.loading = false;
    } else {
      this.obtenerAsesores();
    }
  }

  obtenerAsesores(): void {
    this.loading = true;
    this.asesorService.listarAsesores().subscribe({
      next: (data) => {
        this.asesores = data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener asesores:', err);
        this.error = 'No se pudieron cargar los asesores.';
        this.loading = false;
      }
    });
  }

  eliminarAsesor(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este asesor?')) {
      this.asesorService.eliminarAsesor(id).subscribe({
        next: () => {
          this.asesores = this.asesores.filter(a => a.idasesor !== id);
        },
        error: (err) => {
          console.error('Error al eliminar asesor:', err);
          alert('No se pudo eliminar el asesor.');
        }
      });
    }
  }

  buscarPorId(id: number): void {
    if (!id) {
      alert('Por favor, ingrese un ID válido.');
      return;
    }

    this.loading = true;
    this.asesorService.obtenerAsesorPorId(id).subscribe({
      next: (data) => {
        this.asesores = data ? [data] : [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al buscar asesor:', err);
        this.error = 'No se encontró ningún asesor con ese ID.';
        this.loading = false;
      }
    });
  }

  filtrarPorEstado(estado: boolean): void {
    this.loading = true;
    this.asesorService.listarAsesoresPorEstado(estado).subscribe({
      next: (data) => {
        this.asesores = data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al filtrar asesores por estado:', err);
        this.error = 'No se pudieron filtrar los asesores.';
        this.loading = false;
      }
    });
  }

  filtrarPorEspecialidad(especialidad: string): void {
    if (!especialidad.trim()) {
      alert('Ingrese una especialidad válida.');
      return;
    }

    this.loading = true;
    this.asesorService.listarAsesoresPorEspecialidad(especialidad).subscribe({
      next: (data) => {
        this.asesores = data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al filtrar por especialidad:', err);
        this.error = 'No se encontraron asesores con esa especialidad.';
        this.loading = false;
      }
    });
  }

  cambiarEstado(id: number, nuevoEstado: boolean): void {
    this.asesorService.actualizarEstado(id, nuevoEstado).subscribe({
      next: () => {
        const asesor = this.asesores.find(a => a.idasesor === id);
        if (asesor) {
          asesor.estadoasesor = nuevoEstado;
        }
        this.ordenarAsesores(); // <--- aquí lo reacomoda siempre
      },
      error: () => alert("Error al actualizar estado")
    });
  }

  ordenarAsesores() {
    this.asesores.sort((a, b) => a.idasesor - b.idasesor);
    localStorage.setItem("ordenAsesores", JSON.stringify(this.asesores));
  }




}
