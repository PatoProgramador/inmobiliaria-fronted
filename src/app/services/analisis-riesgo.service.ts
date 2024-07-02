import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAnalisisRiesgo, IAnalisisRiesgoInput } from '../models/analisisRiesgo.model';

@Injectable({
  providedIn: 'root'
})
export class AnalisisRiesgoService {

  private baseURL = 'http://localhost:8080/analisisRiesgo';
  
  constructor(private _httpClient: HttpClient) {}

  public crearAnalisis(idInmueble: number, analisisRiesgo: IAnalisisRiesgoInput): Observable<IAnalisisRiesgo> {
    return this._httpClient.post<IAnalisisRiesgo>(`${this.baseURL}/crear/inmueble/${idInmueble}`, analisisRiesgo);
  }
}
