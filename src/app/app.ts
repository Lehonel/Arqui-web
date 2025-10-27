import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgIf, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    NgIf,
    RouterLink,
    RouterOutlet
  ],
  styleUrls: ['./app.css']
})
export class App {
  mostrarNavbar = true;
  menuAbierto = false; // 👈 Nuevo estado del menú hamburguesa

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const rutaActual = event.urlAfterRedirects;
        console.log('Ruta actual:', rutaActual);

        if (rutaActual === '/unete' || rutaActual === '/registro' || rutaActual === '/recuperar') {
          this.mostrarNavbar = false;
        } else {
          this.mostrarNavbar = true;
        }

        // 👇 Cierra el menú hamburguesa cuando se cambia de ruta
        this.menuAbierto = false;
      });
  }


  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }
  cerrarMenu() {

  }
}
