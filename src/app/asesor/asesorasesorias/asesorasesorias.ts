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

  mostrarFormulario = false;

  currentSlide = 0;
  cardsPerView = 3;
  cardWidth = 0;

  categoriaActiva = 'Todos';
  categorias: string[] = ['Todos', 'Programación', 'Diseño', 'Marketing', 'Idiomas', 'Negocios'];

  asesorias: any[] = [];
  asesoriasFiltradas: any[] = [];
  asesoriasRecomendadas: any[] = [];

  constructor(private http: HttpClient, private asesoriaService: AsesoriaService, private router: Router) {}

  loading = true;
  error: string | null = null;




  ngOnInit(): void {
    this.cargarAsesoriasPorAsesor();
  }

  private safeParseJwtPayload(token: string | null): any | null {
    if (!token) return null;
    try {
      const parts = token.split('.');
      if (parts.length < 2) return null;
      return JSON.parse(atob(parts[1]));
    } catch {
      return null;
    }
  }

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

  cargarAsesoriasPorAsesor(): void {
    this.loading = true;
    this.error = null;

    this.http.get<any[]>('http://localhost:8080/api/skillink/asesoria/listar').subscribe({
      next: (data) => {
        const token = localStorage.getItem('token');
        const rol = localStorage.getItem('rol');
        let resultado = data || [];

        if (rol === 'ASESOR' && token) {
          const payload = this.safeParseJwtPayload(token);
          let nombreToken = (payload?.sub || '').trim();
          nombreToken = this.fixEncoding(nombreToken).toLowerCase();

          resultado = (data || []).filter(a =>
            this.fixEncoding(a.asesor?.nombreasesor || '').trim().toLowerCase() === nombreToken
          );
        }

        this.asesorias = resultado;
        this.asesoriasFiltradas = [...this.asesorias];
        this.asesoriasRecomendadas = this.asesorias.slice(0, 12);
        setTimeout(() => this.updateCardsPerView(), 0);
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar las asesorías.';
        this.loading = false;
      }
    });
  }

  filtrarPorCategoria(categoria: string): void {
    this.categoriaActiva = categoria;
    if (categoria === 'Todos') {
      this.asesoriasFiltradas = [...this.asesorias];
    } else {
      this.asesoriasFiltradas = this.asesorias.filter(a => a.asesor?.especialidadasesor === categoria);
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

  abrirFormularioCrear(): void {
    this.router.navigate(['/asesor/crear-asesoria']);
  }
  abrirFormularioCrearAsesor(): void {
    this.router.navigate(['/asesor/crear-asesor']);
  }



}

