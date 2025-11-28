import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsesorService {
  private apiUrl = 'http://localhost:8080/api/skillink/administrador/asesores';

  constructor(private http: HttpClient) {}

  listarAsesores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  eliminarAsesor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  obtenerAsesorPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  listarAsesoresPorEstado(estado: boolean): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/estado/${estado}`);
  }

  listarAsesoresPorEspecialidad(especialidad: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/especialidad/${especialidad}`);
  }

  actualizarEstado(id: number, estado: boolean): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/estado`, estado);
  }

}
