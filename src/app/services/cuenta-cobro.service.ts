import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICuentaCobro } from '../models/cuentaCobro.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentaCobroService {

  private baseURL = 'http://localhost:8080/cuentaCobro';
  
  constructor(private _httpClient: HttpClient) {}

  public obtenerComprasPendientes(idPersona: number): Observable<ICuentaCobro[]> {
    return this._httpClient.get<ICuentaCobro[]>(`${this.baseURL}/listar/comprasPendientes/${idPersona}`);
  }

  public obteneAnalisisPendientes(idPersona: number): Observable<ICuentaCobro[]> {
    return this._httpClient.get<ICuentaCobro[]>(`${this.baseURL}/listar/analisisPedientes/${idPersona}`);
  }

  public obtenerArriendosPendientes(idPersona: number): Observable<ICuentaCobro[]> {
    return this._httpClient.get<ICuentaCobro[]>(`${this.baseURL}/listar/arriendosPendientes/${idPersona}`);
  }

  public obtenerCuentaCobroPorId(idCuenta: number): Observable<ICuentaCobro> {
    return this._httpClient.get<ICuentaCobro>(`${this.baseURL}/${idCuenta}`)
  }
}
