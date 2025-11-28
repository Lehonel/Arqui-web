import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from './clientes.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-tabla-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tabla-clientes.html',
  styleUrls: ['./tabla-clientes.css']
})
export class TablaClientesComponent implements OnInit {
  clientes: any[] = [];
  clienteSeleccionado: any = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    const ordenGuardado = localStorage.getItem("ordenarClientes");

    if (ordenGuardado) {
      this.clientes = JSON.parse(ordenGuardado);
      this.loading = false;
    } else {
      this.cargarClientes();
    }
  }

  cargarClientes(): void {
    this.loading = true;
    this.error = null;
    this.clienteService.listarClientes().subscribe({
      next: (data: any[]) => {
        this.clientes = data || [];
        this.loading = false;
      },
      error: (err: any) => {
        console.error("Error al obtener clientes:", err);
        this.error = "No se pudieron cargar los clientes.";
        this.loading = false;
      }
    });
  }

  eliminarCliente(id: number): void {
    if (confirm('¿Seguro que quieres eliminar este cliente?')) {
      this.clienteService.eliminarCliente(id).subscribe({
        next: () => {
          this.clientes = this.clientes.filter(c => c.idcliente !== id);
        },
        error: (err: any) => {
          console.error('Error al eliminar cliente:', err);
          alert('No se pudo eliminar el cliente.');
        }
      });
    }
  }

  buscarPorId(id: number): void {
    if (!id) return;

    this.loading = true;
    this.clienteService.obtenerClientePorId(id).subscribe({
      next: (data) => {
        // Mostramos solo ese cliente en la tabla
        this.clientes = data ? [data] : [];
        this.loading = false;
        this.error = this.clientes.length === 0 ? 'No se encontró el cliente.' : null;
      },
      error: (err) => {
        console.error('Error al buscar cliente:', err);
        this.error = "No se pudo encontrar el cliente.";
        this.loading = false;
        this.clientes = []; // Limpia la tabla
      }
    });
  }

  filtrarPorEstado(estado: boolean): void {
    this.loading = true;
    this.clienteService.listarClientesPorEstado(estado).subscribe({
      next: (data) => {
        this.clientes = data;
        this.loading = false;
      },
      error: (err) => {
        console.error("Error al filtrar por estado:", err);
        this.error = "No se pudieron cargar los clientes por estado.";
        this.loading = false;
      }
    });
  }

  cambiarEstado(id: number, nuevoEstado: boolean): void {
    this.clienteService.actualizarEstado(id, nuevoEstado).subscribe({
      next: () => {
        const cliente = this.clientes.find(c => c.idcliente === id);
        if (cliente) {
          cliente.estadocliente = nuevoEstado;
        }

        this.ordenarClientes(); // 🔥 Ordena como en asesores
      },
      error: () => alert("Error al actualizar estado")
    });
  }

  ordenarClientes(): void {
    this.clientes.sort((a, b) => a.idcliente - b.idcliente);
    localStorage.setItem("ordenarClientes", JSON.stringify(this.clientes));
  }


}
