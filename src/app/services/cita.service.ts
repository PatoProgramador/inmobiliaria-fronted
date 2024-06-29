import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICita } from '../models/cita.model';
import { ICitaInput } from '../models/citaInput.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private baseURL = 'http://localhost:8080/citas';
  
  constructor(private _httpClient: HttpClient) {}

  public crearCita(idInmueble: number, idComercial: number, idComprador: number, idPropietario: number, cita: ICitaInput): Observable<ICita> {
    return this._httpClient.post<ICita>(`${this.baseURL}/crear/inmueble/${idInmueble}/propietario/${idPropietario}/comprador/${idComprador}/comercial/${idComercial}`,cita);
  }
}
