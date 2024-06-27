import { Injectable } from '@angular/core';
import { IPersona } from '../models/persona.model';

@Injectable({
  providedIn: 'root'
})

export class AppService {

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
}