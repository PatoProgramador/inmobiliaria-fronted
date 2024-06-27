import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICatalogo } from '../models/catalogo.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private baseURL = 'http://localhost:8080/catalogo';

  constructor(private _httpClient: HttpClient) {}

  public traerTodasLasCiudades(): Observable<ICatalogo[]> {
    return this._httpClient.get<ICatalogo[]>(`${this.baseURL}/ciudad/listar`);
  }

  public traerTodosLosTiposDeDocumento(): Observable<ICatalogo[]> {
    return this._httpClient.get<ICatalogo[]>(`${this.baseURL}/tipoIdenficacion/listar`);
  }

  public traerTodoslosTiposPersona(): Observable<ICatalogo[]> {
    return this._httpClient.get<ICatalogo[]>(`${this.baseURL}/tipoPersona/listar`);
  }
}
