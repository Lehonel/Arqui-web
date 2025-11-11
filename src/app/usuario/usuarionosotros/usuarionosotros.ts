import { Component } from '@angular/core';

@Component({
  selector: 'app-usuarionosotros',
  imports: [],
  standalone: true,
  templateUrl: './usuarionosotros.html',
  styleUrl: './usuarionosotros.css',
})
export class Usuarionosotros {

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
