import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICiudad } from '../models/ciudad.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private baseURL = 'http://localhost:8080/catalogo';

  constructor(private _httpClient: HttpClient) {}

  public traerTodasLasCiudades(): Observable<ICiudad[]> {
    return this._httpClient.get<ICiudad[]>(`${this.baseURL}/ciudad/listar`);
  }
}
