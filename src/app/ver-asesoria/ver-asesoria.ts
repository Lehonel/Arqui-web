import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VerAsesoriaService, VerAsesoriaDTO } from '../services/ver-asesoria';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-asesoria',
  templateUrl: './ver-asesoria.html',
  styleUrls: ['./ver-asesoria.css'],
  standalone: true,          // si estás usando Angular 15+ y standalone components
  imports: [
    CommonModule,            // necesario para *ngIf y *ngFor
  ],
})
export class VerAsesoria implements OnInit {

  asesoria?: VerAsesoriaDTO; // inicializamos como undefined

  constructor(
    private route: ActivatedRoute,
    private service: VerAsesoriaService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('idasesoria'));

    if (!id) {
      console.error('No se recibió un ID válido');
      return;
    }

    this.service.listarPorId(id).subscribe({
      next: (data) => {
        console.log("DATA RECIBIDA:", data);
        this.asesoria = data; // asignamos los datos al componente
      },
      error: (err) => {
        console.error("Error cargando asesoría:", err);
      }
    });
  }
  //estrellas dinamicas
  getArray(n: number): any[] {
    return Array(n);
  }
}
