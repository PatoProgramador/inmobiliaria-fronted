import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPago, IPagoInput } from '../models/pago.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private baseURL = 'http://localhost:8080/pago';
  
  constructor(private _httpClient: HttpClient) {}

  public crearPago(idCuentaCobro: number, idComprador: number, inputPago: IPagoInput): Observable<IPago> {
    return this._httpClient.post<IPago>(`${this.baseURL}/crear/${idCuentaCobro}/comprador/${idComprador}`, inputPago);
  }
}