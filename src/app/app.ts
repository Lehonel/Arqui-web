import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgIf, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgIf, RouterLink, RouterOutlet]
})
export class App {
  mostrarNavbar = true;
  mostrarFooter = true; // <-- nueva variable
  menuAbierto = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const rutaActual = event.urlAfterRedirects;
        console.log('Ruta actual:', rutaActual);

        // Navbar
        if (rutaActual === '/unete' || rutaActual === '/registro' || rutaActual === '/recuperar') {
          this.mostrarNavbar = false;
        } else {
          this.mostrarNavbar = true;
        }

        // Footer
        if (rutaActual === '/unete' || rutaActual === '/registro' || rutaActual === '/recuperar') {
          this.mostrarFooter = false;
        } else {
          this.mostrarFooter = true;
        }

        this.menuAbierto = false;
      });
  }

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu() {
    this.menuAbierto = false;
  }

}
