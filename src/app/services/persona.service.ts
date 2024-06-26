import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPersona } from '../models/persona.model';
import { IPersonaInput } from '../models/personaInput.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private baseURL = 'http://localhost:8080/persona';

  constructor(private _httpClient: HttpClient) {}

  public traerPersonas(): Observable<IPersona[]> {
    return this._httpClient.get<IPersona[]>(`${this.baseURL}/listar`)
  }

  public traerTodosLosComerciales(): Observable<IPersona[]> {
    return this._httpClient.get<IPersona[]>(`${this.baseURL}/listar/comerciales`)
  }

  public traerPersonaPorTipoDocumento(tipoDocumento: number, documento: string): Observable<IPersona> {
    return this._httpClient.get<IPersona>(`${this.baseURL}/tipoDocumento/${tipoDocumento}/documento/${documento}`)
  }

  public crearPersona(idTipoPersona: number, idTipoIdentificacion: number, idSucursal: number, personaInput: IPersonaInput) {
    return this._httpClient.post<IPersona>(`${this.baseURL}/crearPersona/tipoPersona/${idTipoPersona}/tipoIdentificacion/${idTipoIdentificacion}/sucursal/${idSucursal}`, personaInput)
  }

  public modificarPersona(idPersona:number ,idTipoPersona: number, idTipoIdentificacion: number, idSucursal: number, personaInput: IPersonaInput) {
    return this._httpClient.put<IPersona>(`${this.baseURL}/modificarPersona/${idPersona}/tipoPersona/${idTipoPersona}/tipoIdentificacion/${idTipoIdentificacion}/sucursal/${idSucursal}`, personaInput)
  }
}
