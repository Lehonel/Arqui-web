import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-unete',
  templateUrl: './unete.html',
  styleUrls: ['./unete.css'],
  imports: [ReactiveFormsModule, RouterLink]
})
export class Unete {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Inicializamos formulario con validaciones
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      alert('Por favor ingrese su usuario y contraseña');
      return;
    }

    const payload = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.authService.login(payload).subscribe({
      next: (res) => {
        // Depuración: ver qué roles llegan desde el backend
        console.log('Roles recibidos:', res.roles);

        // Guardamos token en localStorage
        localStorage.setItem('token', res.jwt);

        // Redirigir según rol
        if (res.roles && res.roles.includes('ROLE_USUARIO')) {
          this.router.navigate(['/usuario/homeusuario']);
        } else if (res.roles && res.roles.includes('ROLE_ASESOR')) {
          this.router.navigate(['/asesor/homeasesor']);
        } else {
          alert('Usuario sin rol definido');
          this.router.navigate(['/']); // fallback
        }
      },
      error: (err) => {
        console.error(err);
        alert('Credenciales incorrectas');
      }
    });
  }
}
