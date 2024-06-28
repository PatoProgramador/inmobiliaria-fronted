import { Component, Input, OnInit } from '@angular/core';
import { IInmueble } from 'src/app/models/inmueble.model';

@Component({
  selector: 'app-inmuebles-card',
  templateUrl: './inmuebles-card.component.html',
  styleUrls: ['./inmuebles-card.component.css']
})
export class InmueblesCardComponent {
  @Input() product!: IInmueble;

  imagenPar: string = 'assets/images/bedfb7dbe443427334f9da08d74b39f4.png';
  imagenImpar: string = 'assets/images/casa-los-simpsons.jpg';
}
