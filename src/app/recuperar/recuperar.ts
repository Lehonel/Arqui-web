import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-recuperar',
    imports: [
        FormsModule
    ],
  templateUrl: './recuperar.html',
  styleUrl: './recuperar.css',
})
export class Recuperar {
 email: string = '';

  verificar(){
    if(this.email === '' ){
      alert("Email is required");
    }else{
      alert('Se envio un codigo a *******@gmail.com');
    }
  }
}
