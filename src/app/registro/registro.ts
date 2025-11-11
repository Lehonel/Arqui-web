import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.html',
  styleUrls: ['./registro.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class Registro {
  registroForm: FormGroup;
  rolSeleccionado: 'usuario' | 'asesor' = 'usuario';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registroForm = this.fb.group({
      rol: ['usuario', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      especialidad: ['']
    });
  }

  onRolChange(rol: 'usuario' | 'asesor'): void {
    this.rolSeleccionado = rol;
  }

  registrar(): void {
    if (this.registroForm.invalid) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    const datos = this.registroForm.value;

    if (datos.rol === 'usuario') {
      // --- USUARIO ---
      const payload = {
        nombrecliente: datos.nombre,
        correocliente: datos.correo,
        password: datos.password,
        telefonocliente: Number(datos.telefono),
        direccioncliente: datos.direccion,
        estadocliente: true
      };

      this.authService.registrarUsuario(payload).subscribe({
        next: (response) => {
          console.log('Usuario registrado:', response);
          alert('Usuario registrado correctamente');
          // Redirigir al login
          this.router.navigate(['/unete']);
        },
        error: (err) => {
          console.error('Error en registro de usuario:', err);
          alert('Error al registrar usuario: ' + (err.error?.message || 'Error desconocido'));
        }
      });

    } else if (datos.rol === 'asesor') {
      // --- ASESOR ---

      // Validar que tenga especialidad
      if (!datos.especialidad || datos.especialidad.trim() === '') {
        alert('Por favor ingresa tu especialidad');
        return;
      }

      const payload = {
        nombreasesor: datos.nombre,
        correoasesor: datos.correo,
        password: datos.password,
        telefonoasesor: Number(datos.telefono),
        direccionasesor: datos.direccion,
        estadoasesor: true,
        especialidadasesor: datos.especialidad
      };

      this.authService.registrarAsesor(payload).subscribe({
        next: (response) => {
          console.log('Asesor registrado:', response);
          alert('Asesor registrado correctamente');
          // Redirigir al login
          this.router.navigate(['/unete']);
        },
        error: (err) => {
          console.error('Error en registro de asesor:', err);
          alert('Error al registrar asesor: ' + (err.error?.message || 'Error desconocido'));
        }
      });
    }
  }
}
