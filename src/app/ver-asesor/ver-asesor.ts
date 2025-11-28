import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-asesor',
  templateUrl: './ver-asesor.html',
  styleUrls: ['./ver-asesor.css'],
  standalone: true,
  imports: [CommonModule],
})
export class VerAsesor implements OnInit {

  asesor?: any;

  defaultImg: string = 'assets/default-avatar.png';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('idcartillaasesor'));

    if (!id) {
      console.error('No se recibió un ID válido');
      return;
    }

    this.cargarAsesor(id);
  }

  private cargarAsesor(id: number): void {
    this.http.get<any[]>('http://localhost:8080/api/skillink/cartillaasesor/listarcartilla')
      .subscribe({
        next: (data) => {
          this.asesor = data.find(a => a.idcartillaasesor === id);

          if (!this.asesor) {
            console.error('No se encontró el asesor con ID:', id);
          }
        },
        error: (err) => {
          console.error(" Error cargando asesores:", err);
        }
      });
  }

  getArray(n: number): any[] {
    return Array(n);
  }
}
