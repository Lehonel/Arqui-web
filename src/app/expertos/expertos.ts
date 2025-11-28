import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartillaAsesorService, CartillaAsesor } from './cartillaasesor.service';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-expertos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './expertos.html',
  styleUrls: ['./expertos.css']
})
export class Expertos implements OnInit {
  cartillas: CartillaAsesor[] = [];
  cartillasFiltradas: CartillaAsesor[] = [];

  categorias = ['Todos', 'Programación', 'Diseño', 'Marketing', 'Idiomas', 'Negocios'];
  categoriaActiva = 'Todos';

  rangoPrecio: string = '';
  rangoExperiencia: string = '';
  estrellasFiltro: number | null = null;
  busquedaTexto: string = '';

  constructor(private cartillaService: CartillaAsesorService) {}

  ngOnInit(): void {
    this.cargarCartillas();
  }

  cargarCartillas(): void {
    this.cartillaService.listarCartillas().subscribe({
      next: data => {
        this.cartillas = data;
        this.aplicarFiltros();
      },
      error: err => console.error('Error al cargar cartillas:', err)
    });
  }

  // Filtros de selects
  filtrarPorRangoPrecio(valor: string): void {
    this.rangoPrecio = valor;
    this.aplicarFiltros();
  }

  filtrarPorExperienciaRango(valor: string): void {
    this.rangoExperiencia = valor;
    this.aplicarFiltros();
  }

  filtrarPorEstrellas(estrellas: number): void {
    this.estrellasFiltro = estrellas;
    this.aplicarFiltros();
  }

  filtrarPorCategoria(categoria: string): void {
    this.categoriaActiva = categoria;
    this.aplicarFiltros();
  }

  //  Aplica todos los filtros combinados
  aplicarFiltros(): void {
    this.cartillasFiltradas = this.cartillas.filter(c => {

      //  Filtrar por búsqueda parcial
      const texto = this.busquedaTexto.toLowerCase();

      const coincideBusqueda =
        c.nombrecartillaasesor.toLowerCase().includes(texto) ||
        c.especialcartillaasesor.toLowerCase().includes(texto) ||
        c.descripcioncartillaasesor.toLowerCase().includes(texto);

      // Categoría
      const coincideCategoria =
        this.categoriaActiva === 'Todos' ||
        c.especialcartillaasesor === this.categoriaActiva;

      // Estrellas
      const coincideEstrellas =
        this.estrellasFiltro === null ||
        c.estrellascartillaasesor === this.estrellasFiltro;

      // Precio
      let coincidePrecio = true;
      if (this.rangoPrecio) {
        const [min, max] = this.rangoPrecio.split('-').map(Number);
        coincidePrecio = c.preciocartillaasesor >= min && c.preciocartillaasesor <= max;
      }

      // Experiencia
      let coincideExperiencia = true;
      if (this.rangoExperiencia) {
        const [min, max] = this.rangoExperiencia.split('-').map(Number);
        const anhos = parseInt(c.anhoexperienciacartillaasesor, 10);
        coincideExperiencia = anhos >= min && anhos <= max;
      }

      return (
        coincideBusqueda &&
        coincideCategoria &&
        coincideEstrellas &&
        coincidePrecio &&
        coincideExperiencia
      );
    });
  }
  // Helpers
  getStars(estrellas: number): string[] {
    return Array(5)
      .fill('☆')
      .map((s, i) => (i < estrellas ? '★' : '☆'));
  }

  getImagenUrl(url: string): string {
    if (!url) return 'http://localhost:8080/Imagenes/default.jpg';
    const nombreArchivo = url.split(/[\\/]/).pop();
    return `http://localhost:8080/Imagenes/${nombreArchivo}`;
  }

  filtrarPorBusqueda(): void {
    this.aplicarFiltros();
  }

}
