import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ICuentaCobro } from 'src/app/models/cuentaCobro.model';
import { IPago, IPagoInput } from 'src/app/models/pago.model';
import { IPersona } from 'src/app/models/persona.model';
import { AppService } from 'src/app/services/app.service';
import { CuentaCobroService } from 'src/app/services/cuenta-cobro.service';
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  
  formularioPago!: FormGroup;
  loading: boolean = true;
  formularioConfig!: any[];
  cuentaCobro!: ICuentaCobro;
  logPersona: IPersona | undefined;
  action: string = 'pagar';

  constructor(private form: FormBuilder,
    private _cuentaCobroService: CuentaCobroService,
    private _pagoServce: PagoService,
    private _appService: AppService,
    private _route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this._appService.getPersonaLog()) {
      this.logPersona = this._appService.getPersonaLog();
    }
    
    this._route.params.subscribe({
      next: (params: Params) => {
        this.loadInmuebleData(params['cuentaId']);
      }
    });
  }

  onPago(): void {
    const inputPago: IPagoInput = {
      tipoPago : this.formularioPago.value.tipo_pago
    }
    const idComprador: number = Number(this.logPersona?.id);

    this._pagoServce.crearPago(this.cuentaCobro.id, idComprador, inputPago).subscribe({
      next: (data: IPago) => {
        if (data) {
          alert("El pago se realizó con exito :)")
          this.router.navigate(['pagos-pendientes']);
        } else {
          alert("Ocurrio un error")
        }
      }, error: (error: any) => {
        console.log(error)
      }
    })
  }

  private loadInmuebleData(cuentaId: number): void {
    const cuentaCobro$ = this._cuentaCobroService.obtenerCuentaCobroPorId(cuentaId);

    cuentaCobro$.subscribe({
      next: (data: ICuentaCobro) => {
        this.cuentaCobro = data;
        this.checkLoading();
        this.formularioPago = this.form.group({
          monto: [{ value: this.cuentaCobro.monto, disabled: true }],
          tipo_pago: ['', Validators.required]
        });
    
        this.formularioConfig = [
          { label: 'monto', formControlName: 'monto', type: 'text', controlType: 'input' },
          { label: 'tipo de pago', placeholder: 'Debito', formControlName: 'tipo_pago', type: 'text', controlType: 'input' }
        ];
      }, error: (error: any) => {
        console.log(error);
        this.loading = false;
      }
    });
  }

  private checkLoading(): void {
    if (this.cuentaCobro) {
      this.loading = false;
    }
  }
}
