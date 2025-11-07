import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaClientesComponent } from './tabla-clientes/tabla-clientes';
import { TablaAsesoresComponent } from './tabla-asesores/tabla-asesores';
import { TablaAsesoriasComponent } from './tabla-asesorias/tabla-asesorias';

@Component({
  selector: 'app-homeadministrador',
  standalone: true,
  imports: [
    CommonModule,
    TablaClientesComponent,
    TablaAsesoresComponent,
    TablaAsesoriasComponent
  ],
  templateUrl: './homeadministrador.html',
  styleUrl: './homeadministrador.css',
})
export class Homeadministrador {
  seccionActiva: string = 'clientes';

  mostrarSeccion(seccion: string): void {
    this.seccionActiva = seccion;

  }

}

