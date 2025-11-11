import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrlUsuario = 'http://localhost:8080/api/skillink/usuario';
  private apiUrlAsesor = 'http://localhost:8080/api/skillink/asesor';
  private apiUrlAdministrador = 'http://localhost:8080/api/skillink/administrador';

  private rolSubject = new BehaviorSubject<string | null>(null);
  rol$ = this.rolSubject.asObservable();

  constructor(private http: HttpClient) {
    const rolGuardado = localStorage.getItem('rol');
    if (rolGuardado) {
      this.rolSubject.next(rolGuardado);
    }
  }

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
    );
  }


  setRol(rol: string | null): void {
    if (rol) {
      // Quitar el prefijo "ROLE_" si existe
      const rolLimpio = rol.startsWith('ROLE_') ? rol.substring(5) : rol;
      localStorage.setItem('rol', rolLimpio);
      this.rolSubject.next(rolLimpio);
      console.log('Rol limpio guardado:', rolLimpio);
    }
  }

  getRol(): Observable<string | null> {
    return this.rol$;
  }

  logout(): void {
    localStorage.removeItem('rol');
    localStorage.removeItem('token');
    this.rolSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
