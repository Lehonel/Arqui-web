import { Component } from '@angular/core';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css',
})
export class Nosotros {

  equipo = [
    {
      nombre: 'Lehonel',
      rol: 'Ingenieria de Sistemas',
      imagen: 'assets/img/lehonel.webp',
    },
    {
      nombre: 'Nelson Alejandro Espinoza',
      rol: 'Ingenieria de Sistemas',
      imagen: 'assets/img/nelson.webp',
    },
    {
      nombre: 'Javier Hugo Chumpitazi',
      rol: 'Ingenieria de Sistemas',
      imagen: 'assets/img/javier.webp',
    },
    {
      nombre: 'José Matos Apoloni',
      rol: 'Ingenieria de Sistemas',
      imagen: 'assets/img/jose.webp',
    },
    {
      nombre: 'Jhair Israel Martel Paez',
      rol: 'Ingenieria de Sistemas',
      imagen: 'assets/img/jhair.webp',
    },
  ];
}
