import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unete',
  standalone: true,
  templateUrl: './unete.html',
  styleUrls: ['./unete.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class UneteComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      alert('Por favor ingrese su usuario y contraseña');
      return;
    }

    const payload = this.loginForm.value;

    this.authService.login(payload).subscribe({
      next: (data) => {
        console.log('Login correcto', data);

        // Guardar token
        localStorage.setItem('token', data.jwt);

        // Guardar y actualizar rol
        const rol = data.roles[0];
        this.authService.setRol(rol);

        console.log('Rol guardado:', rol);
        console.log('localStorage rol:', localStorage.getItem('rol'));

        if (rol === 'ADMIN') {
          this.router.navigate(['/administrador/tabla-clientes']).then(() => {
            window.location.reload(); // Forzar recarga
          });
        } else if (rol === 'ASESOR') {
          this.router.navigate(['/asesor/homeasesor']).then(() => {
            window.location.reload();
          });
        } else if (rol === 'USUARIO') {
          this.router.navigate(['/usuario/homeusuario']).then(() => {
            window.location.reload();
          });
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        alert('Error de autenticación. Verifica tus credenciales.');
        console.error('Error en login:', err);
      }
    });
  }
}
