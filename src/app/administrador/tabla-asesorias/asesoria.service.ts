import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsesoriaService {
  private apiUrl = 'http://localhost:8080/api/skillink/administrador/asesorias';

  constructor(private http: HttpClient) {}

  listarAsesorias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerAsesoriaPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  listarPorFecha(fecha: string): Observable<any[]> {
    // fecha viene en formato yyyy-MM-dd
    return this.http.get<any[]>(`${this.apiUrl}/fecha/${fecha}`);
  }

  eliminarAsesoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
