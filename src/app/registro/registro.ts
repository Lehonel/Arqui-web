import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router
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
  onRolChange(rol: 'usuario' | 'asesor') {
    this.rolSeleccionado = rol;
  }

  registrar() {
    const datos = this.registroForm.value;


    const registroJSON = {
      ...datos,
      estado: 'activo'
    };
    const usuario = {
      correo: datos.correo,
      password: datos.password,
      nombre: datos.nombre,
      telefono: datos.telefono,
      direccion: datos.direccion,
      especialidad: datos.especialidad,
      rol: datos.rol,
      estado: 'activo'
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));
    alert('Registro exitoso. Ahora inicia sesión.');
    // aquí podrías redirigir al login/unete:
    this.router.navigate(['/unete']);

    console.log('Registro:', registroJSON);


  }
}
