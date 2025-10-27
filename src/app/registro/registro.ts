import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      rol: ['usuario', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
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

    console.log('Registro:', registroJSON);


  }
}
