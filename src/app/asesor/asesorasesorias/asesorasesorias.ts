import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {VerAsesoria} from '../../ver-asesoria/ver-asesoria';
import {AsesoriaService} from '../../services/asesoria';
import {Router, RouterLink} from '@angular/router';


@Component({
  selector: 'app-asesorasesorias',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './asesorasesorias.html',
  styleUrls: ['./asesorasesorias.css']

})
export class Asesorasesorias implements AfterViewInit, OnInit {

  currentSlide = 0;
  cardsPerView = 3;
  cardWidth = 0;

  categoriaActiva = 'Todos';
  categorias: string[] = ['Todos', 'Programación', 'Diseño', 'Marketing', 'Idiomas', 'Negocios'];

  asesorias: any[] = [];
  asesoriasFiltradas: any[] = [];
  asesoriasRecomendadas: any[] = [];

  constructor(private http: HttpClient, private asesoriaService: AsesoriaService, private router: Router) {}

  ngOnInit(): void {
    this.cargarAsesorias();
  }

  cargarAsesorias(): void {
    this.http.get<any[]>('http://localhost:8080/api/skillink/asesoria/listar').subscribe({
      next: (data) => {
        this.asesorias = data;
        this.asesoriasFiltradas = [...this.asesorias];
        this.asesoriasRecomendadas = this.asesorias.slice(0, 12);
        setTimeout(() => this.updateCardsPerView(), 0);
      },
      error: (err) => console.error('Error al listar asesorías:', err)
    });
  }

  filtrarPorCategoria(categoria: string): void {
    this.categoriaActiva = categoria;
    if (categoria === 'Todos') {
      this.asesoriasFiltradas = [...this.asesorias];
    } else {
      this.asesoriasFiltradas = this.asesorias.filter(a => a.asesor.especialidadasesor === categoria);
    }
    this.currentSlide = 0;
  }

  updateCardsPerView(): void {
    const container = document.querySelector('.carousel-wrapper') as HTMLElement;
    const card = container?.querySelector('.asesoria-card') as HTMLElement;
    if (!card || !container) {
      this.cardWidth = 0;
      return;
    }
    this.cardWidth = card.offsetWidth + 16;
    const containerWidth = container.offsetWidth;
    this.cardsPerView = Math.floor(containerWidth / this.cardWidth);
  }

  getCarouselTransform(): string {
    if (this.cardWidth === 0) return 'translateX(0)';
    return `translateX(-${this.currentSlide * this.cardWidth}px)`;
  }

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

  ngAfterViewInit(): void {
    setTimeout(() => this.updateCardsPerView(), 0);
    window.addEventListener('resize', () => this.updateCardsPerView());
  }
}

