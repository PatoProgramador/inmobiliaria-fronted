import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInmueble } from '../models/inmueble.model';
import { IInmuebleInput } from '../models/inmuebleInput.mode';
import { IPersona } from '../models/persona.model';

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

  public traerInmueblePorId(idInmueble: number): Observable<IInmueble> {
    return this._httpClient.get<IInmueble>(`${this.baseURL}/${idInmueble}`)
  }

  public traerPropietario(idInmueble: number): Observable<IPersona> {
    return this._httpClient.get<IPersona>(`${this.baseURL}/${idInmueble}/propietario`)
  }

  public crearInmueble(idPersona: number, inmueble: IInmuebleInput ): Observable<IInmueble> {
    return this._httpClient.post<IInmueble>(`${this.baseURL}/crearInmueble/persona/${idPersona}`, inmueble)
  }

  public editarInmueble(idInmueble: number, idPersona: number, inmuebleInput: IInmuebleInput): Observable<IInmueble> {
    return this._httpClient.put<IInmueble>(`${this.baseURL}/modificarInmueble/${idInmueble}/persona/${idPersona}`, inmuebleInput)
  }

}
