import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('rol');
    const ruta = state.url;


    // No hay token → no puede entrar
    if (!token) {
      this.router.navigate(['/']);
      return false;
    }

    // Reglas por rol
    if (rol === 'ADMIN' && ruta.startsWith('/administrador')) return true;
    if (rol === 'ASESOR' && ruta.startsWith('/asesor')) return true;
    if (rol === 'USUARIO' && ruta.startsWith('/usuario')) return true;

    // Si el rol no coincide con la ruta → redirige
    this.router.navigate(['/']);
    return false;
  }
}
