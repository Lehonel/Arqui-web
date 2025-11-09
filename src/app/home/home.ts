import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  mostrarContenido = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Verificar si hay sesión iniciada
    this.authService.getRol().subscribe(rol => {
      if (rol) {
        // Hay sesión iniciada, redirigir según el rol
        console.log('Hay sesión activa, redirigiendo desde Home...');
        this.mostrarContenido = false;

        switch(rol) {
          case 'USUARIO':
            this.router.navigate(['/usuario/homeusuario']);
            break;
          case 'ASESOR':
            this.router.navigate(['/asesor/homeasesor']);
            break;
          case 'ADMIN':
            this.router.navigate(['/administrador/homeadministrador']);
            break;
        }
      }
    });
  }
}
