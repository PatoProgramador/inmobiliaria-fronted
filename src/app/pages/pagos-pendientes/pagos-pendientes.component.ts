import { Component, OnInit } from '@angular/core';
import { ICuentaCobro } from 'src/app/models/cuentaCobro.model';
import { AppService } from 'src/app/services/app.service';
import { CuentaCobroService } from 'src/app/services/cuenta-cobro.service';

@Component({
  selector: 'app-pagos-pendientes',
  templateUrl: './pagos-pendientes.component.html',
  styleUrls: ['./pagos-pendientes.component.css']
})
export class PagosPendientesComponent implements OnInit {

  comprasPendientes!: ICuentaCobro[];
  arriendosPendientes!: ICuentaCobro[];
  analisisPendientes!: ICuentaCobro[];
  loading: boolean = true;

  compra: boolean = false;
  arriendo: boolean = false;
  analisis: boolean = false;

  onCompra(): void {
    this.compra = !this.compra;
    if (this.arriendo) {
      this.arriendo = !this.arriendo;
    }
    if (this.analisis) {
      this.analisis = !this.analisis;
    }
  }

  onArriendo(): void {
    this.arriendo = !this.arriendo;
    if (this.compra) {
      this.compra = !this.compra;
    }
    if (this.analisis) {
      this.analisis = !this.analisis;
    }
  }

  onAnalisis(): void {
    this.analisis = !this.analisis;
    this.arriendo = !this.arriendo;
    if (this.compra) {
      this.compra = !this.compra;
    }
    if (this.arriendo) {
      this.arriendo = !this.arriendo;
    }
  }


  constructor(
    private _appService : AppService,
    private _cuentaCobroService: CuentaCobroService
  ) {}

  ngOnInit(): void {
    this.loadPagosData();
    this.checkLoading();
  }

  private loadPagosData(): void {
    const idPersona = this._appService.getPersonaLog()?.id;

    if (!idPersona) {
      alert("Aun no estas registrado")
      return;
    }

    const compras$ = this._cuentaCobroService.obtenerComprasPendientes(idPersona);
    const arriendos$ = this._cuentaCobroService.obtenerArriendosPendientes(idPersona);
    const analisis$ = this._cuentaCobroService.obteneAnalisisPendientes(idPersona);

    compras$.subscribe({
      next: (data: ICuentaCobro[]) => {
        console.log(data);
        this.comprasPendientes = data;
        this.checkLoading();
      }, error: (error: any) => {
        console.log(error);
        this.loading = false;
      }
    });

    arriendos$.subscribe({
      next: (data: ICuentaCobro[]) => {
        console.log(data)
        this.arriendosPendientes = data;
        this.checkLoading();
      }, error: (error: any) => {
        console.log(error);
        this.loading = false;
      }
    });

    analisis$.subscribe({
      next: (data: ICuentaCobro[]) => {
        console.log(data)
        this.analisisPendientes = data;
        this.checkLoading();
      }, error: (error: any) => {
        console.log(error);
        this.loading = false;
      }
    });
  }

  private checkLoading(): void {
    if (this.comprasPendientes !== null && this.arriendosPendientes !== null && this.analisisPendientes !== null) {
      this.loading = false;
    }
  }
}
