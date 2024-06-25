import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  ciudad: string = 'BOG';

  constructor() { }

  setCiudad(value: string): void {
    this.ciudad = value;
  }

  getCiudad(): string {
    return this.ciudad;
  }
}