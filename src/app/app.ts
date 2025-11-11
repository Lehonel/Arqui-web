import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth';
import { filter } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, RouterModule, RouterLink, HttpClientModule],
})
export class AppComponent implements OnInit {
  mostrarNavbar = true;
  mostrarFooter = true;
  rol: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    // Suscribirse a cambios de rol en AuthService
    this.authService.rol$.subscribe((rol) => {
      this.rol = rol;
      console.log('Rol actualizado en AppComponent:', this.rol);
    });

    // Detectar cambios de ruta para ocultar navbar/footer en páginas específicas
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      console.log('Navegación detectada. URL:', this.router.url);
      console.log('Rol actual:', this.rol);
      this.verificarRutasEspeciales();
    });
  }

  ngOnInit(): void {
    // Inicializar rol desde localStorage si existe
    const rolGuardado = localStorage.getItem('rol');
    const token = localStorage.getItem('token');
    const currentUrl = this.router.url;
    if (rolGuardado) {
      this.rol = rolGuardado;
      console.log('Rol cargado en ngOnInit:', this.rol);
    }

    if (token && (currentUrl === '/' || currentUrl === '/home')) {
      if (rolGuardado === 'USUARIO') {
        this.router.navigate(['/usuario/homeusuario']);
      } else if (rolGuardado === 'ASESOR') {
        this.router.navigate(['/asesor/homeasesor']);
      } else if (rolGuardado === 'ADMIN') {
        this.router.navigate(['/administrador/tabla-clientes']);
      }
    }
  }

  verificarRutasEspeciales(): void {
    const rutaActual = this.router.url;
    const rutasSinNavFooter = ['/registro', '/unete'];

    if (rutasSinNavFooter.some(ruta => rutaActual.includes(ruta))) {
      this.mostrarNavbar = false;
      this.mostrarFooter = false;
    } else {
      this.mostrarNavbar = true;
      this.mostrarFooter = true;
    }
  }

  // Retorna la ruta del home según el rol
  getHomeRoute(): string {
    switch(this.rol) {
      case 'USUARIO':
        return '/usuario/homeusuario';
      case 'ASESOR':
        return '/asesor/homeasesor';
      case 'ADMIN':
        return '/home';
      default:
        return '/home'; // Landing
    }
  }

  // Controla el click en el logo
  navigateToHome(event: Event): void {
    if (this.rol === 'ADMIN') {
      event.preventDefault(); // Bloquear navegación para admin
      console.log('Admin no puede navegar desde el logo');
    }
  }

  // Cerrar sesión
  cerrarSesion(): void {
    console.log('Cerrando sesión...');
    this.authService.logout();
    this.rol = null;
    this.router.navigate(['/home']); // Llévalo al login o inicio
  }
}
