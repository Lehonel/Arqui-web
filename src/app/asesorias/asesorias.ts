import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asesorias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asesorias.html',
  styleUrls: ['./asesorias.css']
})
export class Asesorias implements AfterViewInit { // Se implementa AfterViewInit

  currentSlide = 0;
  cardsPerView = 3;
  categoriaActiva = 'Todos';
  cardWidth = 0; // Propiedad para almacenar el ancho de la tarjeta + gap

  categorias = ['Todos', 'Programación', 'Diseño', 'Marketing', 'Idiomas', 'Negocios'];

  asesoriasRecomendadas = [
    {
      titulo: 'Introducción a Angular',
      asesor: 'Lehonel',
      descripcion: 'Aprende los fundamentos de Angular y crea tus primeras aplicaciones web dinámicas.',
      rating: 4.8,
      resenas: 120,
      precio: 49.99,
      precioAntiguo: 69.99,
      img: 'assets/img/angular.webp',
    },
    {
      titulo: 'Diseño UX/UI desde cero',
      asesor: 'Nelson Alejandro Espinoza',
      descripcion: 'Domina los principios del diseño centrado en el usuario y crea interfaces atractivas.',
      rating: 4.5,
      resenas: 95,
      precio: 59.99,
      precioAntiguo: 79.99,
      img: 'assets/img/diseno.webp'
    },
    {
      titulo: 'Marketing Digital Avanzado',
      asesor: 'Javier Hugo Chumpitazi',
      descripcion: 'Aprende estrategias de marketing digital efectivas para potenciar tu marca.',
      rating: 4.9,
      resenas: 210,
      precio: 69.99,
      precioAntiguo: 89.99,
      img: 'assets/img/marketing.webp'
    },
    {
      titulo: 'Fundamentos de JavaScript',
      asesor: 'Carlos Vega',
      descripcion: 'Aprende JavaScript desde cero y construye aplicaciones dinámicas para web.',
      rating: 4.7,
      resenas: 130,
      precio: 49.99,
      precioAntiguo: 69.99,
      img: 'assets/img/javascript.webp'
    },
    {
      titulo: 'Python para Principiantes',
      asesor: 'María Torres',
      descripcion: 'Introducción a Python con ejercicios prácticos y proyectos iniciales.',
      rating: 4.8,
      resenas: 150,
      precio: 59.99,
      precioAntiguo: 79.99,
      img: 'assets/img/python.webp'
    },
    {
      titulo: 'Node.js y Express Básico',
      asesor: 'José Matos Apoloni',
      descripcion: 'Aprende a crear aplicaciones backend usando Node.js y Express.',
      rating: 4.6,
      resenas: 110,
      precio: 64.99,
      precioAntiguo: 84.99,
      img: 'assets/img/node.webp'
    },

    {
      titulo: 'Diseño Gráfico con Photoshop',
      asesor: 'Lucía Ramírez',
      descripcion: 'Aprende técnicas profesionales de edición y creación de imágenes.',
      rating: 4.5,
      resenas: 100,
      precio: 54.99,
      precioAntiguo: 74.99,
      img: 'assets/img/photoshop.png'
    },
    {
      titulo: 'Marketing de Contenidos',
      asesor: 'Diego Rivas',
      descripcion: 'Crea contenido que genere engagement y aumente tus ventas.',
      rating: 4.7,
      resenas: 120,
      precio: 64.99,
      precioAntiguo: 84.99,
      img: 'assets/img/contenidos.jpg'
    },
  ];


  asesorias = [
    // === Programación ===
    {
      titulo: 'Desarrollo Web con Angular y TypeScript',
      descripcion: 'Aprende a construir aplicaciones modernas con Angular, componentes reutilizables y buenas prácticas.',
      rating: 4.9,
      resenas: 142,
      precio: 69.99,
      precioAntiguo: 89.99,
      img: 'assets/img/angular.webp',
      categoria: 'Programación'
    },
    {
      titulo: 'Fundamentos de JavaScript Moderno',
      descripcion: 'Domina las bases de JavaScript ES6+ y entiende cómo funcionan las promesas, closures y el DOM.',
      rating: 4.7,
      resenas: 110,
      precio: 49.99,
      precioAntiguo: 64.99,
      img: 'assets/img/js.jpg',
      categoria: 'Programación'
    },
    {
      titulo: 'Python para Ciencia de Datos',
      descripcion: 'Aprende Python con enfoque en análisis de datos, NumPy, pandas y visualización con Matplotlib.',
      rating: 4.8,
      resenas: 230,
      precio: 59.99,
      precioAntiguo: 79.99,
      img: 'assets/img/python.webp',
      categoria: 'Programación'
    },
    {
      titulo: 'Desarrollo Backend con Node.js y Express',
      descripcion: 'Crea APIs REST seguras y escalables usando Node.js, Express y bases de datos NoSQL.',
      rating: 4.6,
      resenas: 185,
      precio: 64.99,
      precioAntiguo: 84.99,
      img: 'assets/img/node.webp',
      categoria: 'Programación'
    },
    {
      titulo: 'Java desde Cero hasta Avanzado',
      descripcion: 'Aprende programación orientada a objetos en Java, estructuras de datos y desarrollo de proyectos completos.',
      rating: 4.9,
      resenas: 198,
      precio: 74.99,
      precioAntiguo: 94.99,
      img: 'assets/img/java.webp',
      categoria: 'Programación'
    },
    {
      titulo: 'Desarrollo Web con React',
      descripcion: 'Aprende a crear aplicaciones interactivas con React, JSX y hooks.',
      rating: 4.7,
      resenas: 120,
      precio: 59.99,
      precioAntiguo: 79.99,
      img: 'assets/img/react.jpg',
      categoria: 'Programación'
    },
    {
      titulo: 'Fundamentos de SQL',
      descripcion: 'Domina consultas, joins y manejo de bases de datos relacionales.',
      rating: 4.6,
      resenas: 95,
      precio: 49.99,
      precioAntiguo: 69.99,
      img: 'assets/img/sql.webp',
      categoria: 'Programación'
    },
    {
      titulo: 'Node.js Avanzado',
      descripcion: 'Aprende a crear aplicaciones backend escalables y seguras con Node.js.',
      rating: 4.8,
      resenas: 130,
      precio: 64.99,
      precioAntiguo: 84.99,
      img: 'assets/img/node.webp',
      categoria: 'Programación'
    },
    {
      titulo: 'Programación en Python Avanzado',
      descripcion: 'Profundiza en Python con programación orientada a objetos y módulos avanzados.',
      rating: 4.9,
      resenas: 160,
      precio: 69.99,
      precioAntiguo: 89.99,
      img: 'assets/img/python.webp',
      categoria: 'Programación'
    },
    {
      titulo: 'Desarrollo Mobile con Kotlin',
      descripcion: 'Crea apps Android modernas usando Kotlin y buenas prácticas de desarrollo.',
      rating: 4.7,
      resenas: 110,
      precio: 59.99,
      precioAntiguo: 79.99,
      img: 'assets/img/kotlin.jpg',
      categoria: 'Programación'
    },

    // === Diseño ===
    {
      titulo: 'Diseño UX/UI desde cero',
      descripcion: 'Domina los principios del diseño centrado en el usuario y crea interfaces atractivas.',
      rating: 4.5,
      resenas: 95,
      precio: 59.99,
      precioAntiguo: 79.99,
      img: 'assets/img/diseno.webp',
      categoria: 'Diseño'
    },
    {
      titulo: 'Diseño Gráfico con Photoshop',
      descripcion: 'Aprende técnicas profesionales de edición y creación de imágenes.',
      rating: 4.6,
      resenas: 85,
      precio: 49.99,
      precioAntiguo: 69.99,
      img: 'assets/img/photoshop.png',
      categoria: 'Diseño'
    },
    {
      titulo: 'Diseño de Interfaces con Figma',
      descripcion: 'Crea prototipos y diseños de interfaz atractivos con Figma.',
      rating: 4.8,
      resenas: 95,
      precio: 59.99,
      precioAntiguo: 79.99,
      img: 'assets/img/figma.jpg',
      categoria: 'Diseño'
    },
    {
      titulo: 'Animación Digital con After Effects',
      descripcion: 'Domina animaciones y motion graphics para video y web.',
      rating: 4.7,
      resenas: 100,
      precio: 64.99,
      precioAntiguo: 84.99,
      img: 'assets/img/aftereffects.webp',
      categoria: 'Diseño'
    },
    {
      titulo: 'Branding y Identidad Corporativa',
      descripcion: 'Crea marcas fuertes y consistentes para cualquier tipo de negocio.',
      rating: 4.9,
      resenas: 120,
      precio: 69.99,
      precioAntiguo: 89.99,
      img: 'assets/img/branding.jpg',
      categoria: 'Diseño'
    },
    {
      titulo: 'Diseño UX para Apps Móviles',
      descripcion: 'Aprende a diseñar experiencias de usuario intuitivas para dispositivos móviles.',
      rating: 4.8,
      resenas: 110,
      precio: 59.99,
      precioAntiguo: 79.99,
      img: 'assets/img/uxmobile.png',
      categoria: 'Diseño'
    },

    // === Marketing ===
    {
      titulo: 'Marketing Digital Avanzado',
      descripcion: 'Aprende estrategias de marketing digital efectivas para potenciar tu marca.',
      rating: 4.9,
      resenas: 210,
      precio: 69.99,
      precioAntiguo: 89.99,
      img: 'assets/img/marketing.webp',
      categoria: 'Marketing'
    },
    {
      titulo: 'SEO y Posicionamiento Web',
      descripcion: 'Optimiza sitios web para mejorar su visibilidad en buscadores.',
      rating: 4.7,
      resenas: 150,
      precio: 49.99,
      precioAntiguo: 69.99,
      img: 'assets/img/seo.jpg',
      categoria: 'Marketing'
    },
    {
      titulo: 'Publicidad en Redes Sociales',
      descripcion: 'Crea campañas efectivas en Facebook, Instagram y TikTok.',
      rating: 4.6,
      resenas: 130,
      precio: 59.99,
      precioAntiguo: 79.99,
      img: 'assets/img/socialads.png',
      categoria: 'Marketing'
    },
    {
      titulo: 'Email Marketing Profesional',
      descripcion: 'Aprende a diseñar y automatizar campañas de email efectivas.',
      rating: 4.8,
      resenas: 120,
      precio: 54.99,
      precioAntiguo: 74.99,
      img: 'assets/img/emailmarketing.png',
      categoria: 'Marketing'
    },
    {
      titulo: 'Marketing de Contenidos',
      descripcion: 'Crea contenido atractivo que convierta visitantes en clientes.',
      rating: 4.9,
      resenas: 140,
      precio: 64.99,
      precioAntiguo: 84.99,
      img: 'assets/img/contenidos.jpg',
      categoria: 'Marketing'
    },
    {
      titulo: 'Analítica Digital con Google Analytics',
      descripcion: 'Mide y optimiza el rendimiento de tus campañas digitales.',
      rating: 4.7,
      resenas: 100,
      precio: 49.99,
      precioAntiguo: 69.99,
      img: 'assets/img/analytics.jpg',
      categoria: 'Marketing'
    },

    // === Idiomas ===
    {
      titulo: 'Inglés para Principiantes',
      descripcion: 'Aprende a comunicarte en inglés desde cero de manera práctica.',
      rating: 4.8,
      resenas: 180,
      precio: 39.99,
      precioAntiguo: 59.99,
      img: 'assets/img/ingles.png',
      categoria: 'Idiomas'
    },
    {
      titulo: 'Francés Básico',
      descripcion: 'Domina las bases del francés para viajar o estudiar en el extranjero.',
      rating: 4.6,
      resenas: 95,
      precio: 39.99,
      precioAntiguo: 59.99,
      img: 'assets/img/frances.jpg',
      categoria: 'Idiomas'
    },
    {
      titulo: 'Español para Extranjeros',
      descripcion: 'Aprende español de forma práctica y comprensible para principiantes.',
      rating: 4.7,
      resenas: 120,
      precio: 49.99,
      precioAntiguo: 69.99,
      img: 'assets/img/espanol.png',
      categoria: 'Idiomas'
    },
    {
      titulo: 'Alemán Intermedio',
      descripcion: 'Mejora tus habilidades en alemán con gramática y vocabulario avanzado.',
      rating: 4.8,
      resenas: 110,
      precio: 59.99,
      precioAntiguo: 79.99,
      img: 'assets/img/aleman.png',
      categoria: 'Idiomas'
    },
    {
      titulo: 'Chino Mandarín Básico',
      descripcion: 'Aprende a hablar y escribir en mandarín con lecciones simples y efectivas.',
      rating: 4.7,
      resenas: 100,
      precio: 59.99,
      precioAntiguo: 79.99,
      img: 'assets/img/chino.png',
      categoria: 'Idiomas'
    },

    // === Negocios ===
    {
      titulo: 'Gestión de Proyectos con Scrum',
      descripcion: 'Aprende a organizar y gestionar proyectos de manera ágil y eficiente.',
      rating: 4.8,
      resenas: 140,
      precio: 64.99,
      precioAntiguo: 84.99,
      img: 'assets/img/scrum.png',
      categoria: 'Negocios'
    },
    {
      titulo: 'Finanzas para Emprendedores',
      descripcion: 'Comprende los fundamentos financieros para gestionar tu negocio exitosamente.',
      rating: 4.7,
      resenas: 120,
      precio: 49.99,
      precioAntiguo: 69.99,
      img: 'assets/img/finanzas.jpg',
      categoria: 'Negocios'
    },
    {
      titulo: 'Liderazgo y Gestión de Equipos',
      descripcion: 'Desarrolla habilidades de liderazgo y motivación para tu equipo de trabajo.',
      rating: 4.9,
      resenas: 130,
      precio: 59.99,
      precioAntiguo: 79.99,
      img: 'assets/img/resize.webp',
      categoria: 'Negocios'
    },
    {
      titulo: 'Emprendimiento y Plan de Negocios',
      descripcion: 'Aprende a crear tu plan de negocio y a lanzar tu emprendimiento con éxito.',
      rating: 4.8,
      resenas: 115,
      precio: 64.99,
      precioAntiguo: 84.99,
      img: 'assets/img/negocios.jpg',
      categoria: 'Negocios'
    },
    {
      titulo: 'Marketing para Negocios Locales',
      descripcion: 'Promociona tu negocio local y aumenta tus ventas usando estrategias digitales.',
      rating: 4.7,
      resenas: 110,
      precio: 49.99,
      precioAntiguo: 69.99,
      img: 'assets/img/marketinglocal.png',
      categoria: 'Negocios'
    }
  ];


  asesoriasFiltradas = [...this.asesorias];


  filtrarPorCategoria(categoria: string) {
    this.categoriaActiva = categoria;
    if (categoria === 'Todos') {
      this.asesoriasFiltradas = [...this.asesorias];
    } else {
      this.asesoriasFiltradas = this.asesorias.filter(a => a.categoria === categoria);
    }
    this.currentSlide = 0;
  }


  updateCardsPerView() {

    const container = document.querySelector('.asesorias-recomendadas-section') as HTMLElement;
    const card = container?.querySelector('.asesoria-card') as HTMLElement;

    if (!card || !container) {

      this.cardWidth = 0;
      return;
    }


    this.cardWidth = card.offsetWidth + 16;
    const containerWidth = container.offsetWidth;


    this.cardsPerView = Math.floor(containerWidth / this.cardWidth);
  }

  // Método para calcular el transform
  getCarouselTransform(): string {
    if (this.cardWidth === 0) return 'translateX(0)'; // Evita errores al inicio
    return `translateX(-${this.currentSlide * this.cardWidth}px)`;
  }

  // Esto lo uso para pasar en el carrusel - Ahora solo manipula currentSlide
  nextSlide(): void {
    this.updateCardsPerView();
    const maxSlide = this.asesoriasRecomendadas.length - this.cardsPerView;

    if (this.currentSlide < maxSlide) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }
    // El binding de Angular en el HTML se encarga del transform: [style.transform]="getCarouselTransform()"
  }

  // Esto lo uso para devolver en el carrusel - Ahora solo manipula currentSlide
  prevSlide(): void {
    this.updateCardsPerView();
    const maxSlide = this.asesoriasRecomendadas.length - this.cardsPerView;

    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = maxSlide >= 0 ? maxSlide : 0;
    }
    // El binding de Angular en el HTML se encarga del transform
  }

  //Esto se usa para ver las estrellas en el card
  getStars(rating: number): string[] {
    const stars: string[] = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push('fa-solid fa-star'); // estrella llena
    }
    if (halfStar) {
      stars.push('fa-solid fa-star-half-stroke'); // estrella media
    }
    while (stars.length < 5) {
      stars.push('fa-regular fa-star'); // estrella vacía
    }
    return stars;
  }

  //Para llamar al inicializar el componente
  ngAfterViewInit() {
    // Es mejor usar setTimeout(0) para asegurar que el DOM esté completamente listo después del ciclo de detección de cambios de Angular
    setTimeout(() => {
      this.updateCardsPerView();
    }, 0);

    window.addEventListener('resize', () => {
      // recalcula cards por vista si se cambia el tamaño
      this.updateCardsPerView();
    });
  }

}
