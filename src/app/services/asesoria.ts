import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Asesoria {
  idasesoria: number;
  nombreasesoria: string;
  descripcionasesoria: string;
  costoasesoria: number;
  fechasesoria: string;
  cantidadresenhas: string;
  cantidadestrellas: number;
  urlimg: string;
  asesor: {
    idasesor: number;
    nombreasesor: string;
    correoasesor: string;
    telefonoasesor: number;
    direccionasesor: string;
    estadoasesor: boolean;
    especialidadasesor: string;
    password: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AsesoriaService {
  private apiUrl = 'http://localhost:8080/api/skillink/asesoria'; //

  constructor(private http: HttpClient) {}

  listarAsesorias(): Observable<Asesoria[]> {
    return this.http.get<Asesoria[]>(this.apiUrl + '/listar');
  }
}
