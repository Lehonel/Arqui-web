import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    NgIf,
    RouterLink,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class App {
  mostrarNavbar = true;
  mostrarFooter = true;
  menuAbierto = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const rutaActual = event.urlAfterRedirects;

        this.mostrarNavbar = !(rutaActual === '/unete' || rutaActual === '/registro' || rutaActual === '/recuperar');
        this.mostrarFooter = !(rutaActual === '/unete' || rutaActual === '/registro' || rutaActual === '/recuperar');

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
