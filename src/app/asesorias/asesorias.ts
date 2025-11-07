import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsesoriaService, Asesoria } from '../services/asesoria';

@Component({
  selector: 'app-asesorias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asesorias.html',
  styleUrls: ['./asesorias.css']
})
export class Asesorias implements AfterViewInit, OnInit {

  // Carrusel
  currentSlide = 0;
  cardsPerView = 3;
  cardWidth = 0;

  // Filtrado por categoría
  categoriaActiva = 'Todos';
  categorias: string[] = ['Todos', 'Programación', 'Diseño', 'Marketing', 'Idiomas', 'Negocios'];

  // Datos
  asesorias: Asesoria[] = [];
  asesoriasFiltradas: Asesoria[] = [];
  asesoriasRecomendadas: Asesoria[] = [];

  constructor(private asesoriaService: AsesoriaService) {}

  ngOnInit(): void {
    this.cargarAsesorias();
  }

  // Carga de asesorías desde el servicio
  cargarAsesorias(): void {
    this.asesoriaService.listarAsesorias().subscribe({
      next: (data) => {
        this.asesorias = data;
        this.asesoriasFiltradas = [...this.asesorias];
        this.asesoriasRecomendadas = this.asesorias.slice(0, 12); // top 5 recomendadas

        // Actualizamos carrusel después de renderizar
        setTimeout(() => this.updateCardsPerView(), 0);
      },
      error: (err) => console.error('Error al listar asesorías:', err)
    });
  }

  // Filtra las asesorías por categoría
  filtrarPorCategoria(categoria: string): void {
    this.categoriaActiva = categoria;
    if (categoria === 'Todos') {
      this.asesoriasFiltradas = [...this.asesorias];
    } else {
      this.asesoriasFiltradas = this.asesorias.filter(a => a.asesor.especialidadasesor === categoria);
    }
    this.currentSlide = 0; // Reset del carrusel
  }

  // Actualiza número de cartas visibles según tamaño del contenedor
  updateCardsPerView(): void {
    const container = document.querySelector('.carousel-wrapper') as HTMLElement;
    const card = container?.querySelector('.asesoria-card') as HTMLElement;
    if (!card || !container) {
      this.cardWidth = 0;
      return;
    }
    this.cardWidth = card.offsetWidth + 16; // 16px de gap
    const containerWidth = container.offsetWidth;
    this.cardsPerView = Math.floor(containerWidth / this.cardWidth);
  }

  // Transform del carrusel
  getCarouselTransform(): string {
    if (this.cardWidth === 0) return 'translateX(0)';
    return `translateX(-${this.currentSlide * this.cardWidth}px)`;
  }

  // Navegación carrusel
  nextSlide(): void {
    this.updateCardsPerView();
    const maxSlide = this.asesoriasRecomendadas.length - this.cardsPerView;
    this.currentSlide = this.currentSlide < maxSlide ? this.currentSlide + 1 : 0;
  }

  prevSlide(): void {
    this.updateCardsPerView();
    const maxSlide = this.asesoriasRecomendadas.length - this.cardsPerView;
    this.currentSlide = this.currentSlide > 0 ? this.currentSlide - 1 : (maxSlide >= 0 ? maxSlide : 0);
  }

  // Función para estrellas de rating (opcional)
  getStars(rating: number): string[] {
    const stars: string[] = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    for (let i = 0; i < fullStars; i++) stars.push('fa-solid fa-star');
    if (halfStar) stars.push('fa-solid fa-star-half-stroke');
    while (stars.length < 5) stars.push('fa-regular fa-star');
    return stars;
  }

  ngAfterViewInit(): void {
    // Asegura que se calcule el carrusel después de renderizar
    setTimeout(() => this.updateCardsPerView(), 0);
    // Ajusta carrusel al redimensionar la ventana
    window.addEventListener('resize', () => this.updateCardsPerView());
  }
}
