import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-unete',
  templateUrl: './unete.html',
  imports: [
    FormsModule,
    RouterLink
  ],
  styleUrls: ['./unete.css']
})
export class Unete {
  email: string = '';
  password: string = '';

  iniciarSesion() {
    if (this.email && this.password) {
      console.log('Iniciando sesión con:', this.email);

    } else {
      alert('Por favor completa todos los campos');
    }
  }
}

