import { Injectable } from '@angular/core';
import { IPersona } from '../models/persona.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  private autenticado: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private esComercial: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  ciudad: string = '';
  personaLogueada?: IPersona;

  constructor() { }

  setCiudad(value: string): void {
    this.ciudad = value;
  }

  getCiudad(): string {
    return this.ciudad;
  }

  setPersonaLog(persona: IPersona): void {
    this.personaLogueada = persona;
  }

  getPersonaLog(): IPersona | undefined {
    return this.personaLogueada;
  }
  // observables
  login(): void {
    this.autenticado.next(true);
  }

  logout(): void {
    this.autenticado.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.autenticado.asObservable();
  }

  verificarRol(): void {
    this.esComercial.next(this.personaLogueada?.tipoPersona == 'Comercial' ? true : false);
  }

  isComercial(): Observable<boolean> {
    return this.esComercial.asObservable();
  }
}