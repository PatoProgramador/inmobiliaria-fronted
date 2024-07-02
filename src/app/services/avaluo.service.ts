import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAvaluo, IAvaluoInput } from '../models/avaluo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvaluoService {

  private baseURL = 'http://localhost:8080/avaluo';
  
  constructor(private _httpClient: HttpClient) {}

  public crearAvaluo(idInmueble: number, avaluo: IAvaluoInput): Observable<IAvaluo> {
    return this._httpClient.post<IAvaluo>(`${this.baseURL}/crearAvaluo/inmueble/${idInmueble}`, avaluo);
  }
}
