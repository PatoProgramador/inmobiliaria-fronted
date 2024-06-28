import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInmueble } from '../models/inmueble.model';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {

  private baseURL = 'http://localhost:8080/inmueble';

  constructor(private _httpClient: HttpClient) {}

  public traerInmueblesPorCiudad(ciudad: string): Observable<IInmueble[]> {
    return this._httpClient.get<IInmueble[]>(`${this.baseURL}/listar/${ciudad}`)
  }

  public traerInmueblePorPersona(idPersona:number): Observable<IInmueble[]> {
    return this._httpClient.get<IInmueble[]>(`${this.baseURL}/listar/persona/${idPersona}`)
  }

}
