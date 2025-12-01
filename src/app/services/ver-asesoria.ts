import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/* ====== MODELOS ====== */
export interface Asesor {
  idasesor: number;
  nombreasesor: string;
  correoasesor: string;
  telefonoasesor: number;
  direccionasesor: string;
  estadoasesor: boolean;
  especialidadasesor: string;
  descripcionasesor: string;
  urlimg: string;
}

export interface Asesoria {
  idasesoria: number;
  nombreasesoria: string;
  descripcionasesoria: string;
  costoasesoria: number;
  fechasesoria: string;
  urlimg: string;
  cantidadresenhas: string;
  cantidadestrellas: number;
  asesor: Asesor;
}

export interface TemaAsesoria {
  idtema: number;
  nombreTema: string;
  descripcionTema: string;
}

export interface Pago {
  idpago: number;
  montopago: number;
  fechapago: string;
}

export interface Cliente {
  idcliente: number;
  nombrecliente: string;
  correocliente?: string;
  telefonocliente: number;
  direccioncliente: string;
  estadocliente: boolean;
}

export interface ResenhaAsesoria {
  idresenha: number;
  descripcionresenha: string;
  puntajeresenha: number;
  fecharesenha: string;
  cliente: Cliente;
}

export interface VerAsesoriaDTO {
  idverasesoria: number;
  descripcionVerAsesoria: string;
  pago: Pago | null;
  asesoria: Asesoria;
  temasAsesoria: TemaAsesoria[];
  resenhas: ResenhaAsesoria[];
}

/* ====== SERVICE ====== */
@Injectable({
  providedIn: 'root'
})
export class VerAsesoriaService {
  private apiURL = 'http://localhost:8080/api/skillink/verasesoria';

  constructor(private http: HttpClient) {}

  listarPorId(id: number): Observable<VerAsesoriaDTO> {
    return this.http.get<VerAsesoriaDTO>(
      `${this.apiURL}/asesoria/${id}`
    );
  }
}
