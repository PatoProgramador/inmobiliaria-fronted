import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pago-card',
  templateUrl: './pago-card.component.html',
  styleUrls: ['./pago-card.component.css']
})
export class PagoCardComponent {

  @Input() idCuenta!:number;
  @Input() cuenta!: string;
  @Input() monto!: number;
  @Input() descripcion!: string;

}
