import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IArriendo, IArriendoInput } from '../models/arriendo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArriendoService {

  private baseURL = 'http://localhost:8080/arriendo';
  
  constructor(private _httpClient: HttpClient) {}

  public crearArriendo(idInmueble: number, idComercial: number, idArrendatario: number, idPropietario: number, arriendo: IArriendoInput): Observable<IArriendo> {
    return this._httpClient.post<IArriendo>(`${this.baseURL}/crear/propietario/${idPropietario}/comercial/${idComercial}/arrendatario/${idArrendatario}/inmueble/${idInmueble}`,arriendo);
  }
}
