import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:8080/api/skillink/administrador/clientes';

  constructor(private http: HttpClient) {}

  listarClientes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  eliminarCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  obtenerClientePorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  listarClientesPorEstado(estado: boolean): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/estado/${estado}`);
  }

  actualizarEstado(id: number, estado: boolean): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/estado`, estado);
  }

}
