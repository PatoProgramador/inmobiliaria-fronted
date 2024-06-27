import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISucursal } from '../models/sucursal.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  private baseURL = 'http://localhost:8080/sucursal';

  constructor(private _httpClient: HttpClient) {}

  public traerTodasLasSucursales(): Observable<ISucursal[]> {
    return this._httpClient.get<ISucursal[]>(`${this.baseURL}/listar`)
  }
}
