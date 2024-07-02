import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICompra, ICompraInput } from '../models/compra.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private baseURL = 'http://localhost:8080/compra';

  constructor(private _httpClient: HttpClient) {}

  public crearCompra(idInmueble: number, idComercial: number, idComprador: number, idPropietario: number, compraIn: ICompraInput): Observable<ICompra> {
    return this._httpClient.post<ICompra>(`${this.baseURL}/crear/propietario/${idPropietario}/comercial/${idComercial}/comprador/${idComprador}/inmueble/${idInmueble}`, compraIn);
  }
}
