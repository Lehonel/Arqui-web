import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CartillaAsesor {
  idcartillaasesor: number;
  nombrecartillaasesor: string;
  descripcioncartillaasesor: string;
  especialcartillaasesor: string;
  estrellascartillaasesor: number;
  urlcartillaasesor: string;
  anhoexperienciacartillaasesor: string;
  preciocartillaasesor: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartillaAsesorService {
  private baseUrl = 'http://localhost:8080/api/skillink/cartillaasesor';

  constructor(private http: HttpClient) {}

  listarCartillas(): Observable<CartillaAsesor[]> {
    return this.http.get<CartillaAsesor[]>(`${this.baseUrl}/listarcartilla`);
  }
}
