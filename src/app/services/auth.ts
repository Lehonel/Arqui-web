import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrlUsuario = 'http://localhost:8080/api/skillink/usuario';
  private apiUrlAsesor = 'http://localhost:8080/api/skillink/asesor';

  constructor(private http: HttpClient) {}

  // ✅ Nombres corregidos para coincidir con tu componente
  registrarUsuario(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrlUsuario}/registrar`, datos);
  }

  registrarAsesor(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrlAsesor}/registrar`, datos);
  }

  login(credenciales: any): Observable<{ jwt: string; roles: string[] }> {
    return this.http.post<{ jwt: string; roles: string[] }>(
      'http://localhost:8080/api/authenticate',
      credenciales
    );}
}
