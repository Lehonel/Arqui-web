import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-unete',
  standalone: true,
  templateUrl: './unete.html',
  styleUrls: ['./unete.css'],
  imports: [
    FormsModule,
    RouterLink
  ]
})
export class Unete {
  email: string = '';
  password: string = '';

  constructor(private router: Router) { }

  iniciarSesion() {
    if (!this.email || !this.password) {
      alert('Por favor completa todos los campos');
      return;
    }

    const usuarioStr = localStorage.getItem('usuario');
    if (!usuarioStr) {
      alert('No tienes cuenta registrada.');
      return;
    }

    const usuario = JSON.parse(usuarioStr);
    if (usuario.correo === this.email && usuario.password === this.password) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('rol', usuario.rol); // opcional, para usar luego

      if (usuario.rol === 'asesor') {
        this.router.navigate(['/asesor/homeasesor']); // ruta para asesores
      } else {
        this.router.navigate(['/usuario/homeusuario']);        // ruta para usuarios normales
      }
    } else {
      alert('Credenciales incorrectas.');
      return;  // <-- Salir si son incorrectas
    }
  }
}
