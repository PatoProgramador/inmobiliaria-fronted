import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICompra, ICompraInput } from 'src/app/models/compra.model';
import { IInmueble } from 'src/app/models/inmueble.model';
import { IPersona } from 'src/app/models/persona.model';
import { AppService } from 'src/app/services/app.service';
import { CompraService } from 'src/app/services/compra.service';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css']
})
export class ComprarComponent implements OnInit {

  @Input() inmueble!: IInmueble;
  @Input() propietario!: IPersona;
  @Input() comerciales!: IPersona[];
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  formularioCompra!: FormGroup;
  loading: boolean = true;
  formularioConfig!: any[];
  action: string = 'comprar';
  compra!: ICompra;
  isPaying: Boolean = false;
  
  constructor(private form: FormBuilder,
    private _appService: AppService,
    private _compraService: CompraService
  ) { }

  ngOnInit(): void {
    this.formularioCompra = this.form.group({
      fecha: [{ value: new Date().toISOString().split('T')[0], disabled: true }],
      comercial: ['', Validators.required]
    });

    this.formularioConfig = [
      { label: 'Fecha', formControlName: 'fecha', type: 'date', controlType: 'input' },
      { label: 'Comercial encargado', formControlName: 'comercial', options: this.comerciales, controlType: 'select' }
    ];
  }

  onEnviar(): void {
    const idInmueble: number = Number(this.inmueble.id);
    const idComercial: number = Number(this.formularioCompra.value.comercial);
    const idPropietario: number = Number(this.propietario.id);
    const idComprador: number = Number(this._appService.getPersonaLog()?.id);
    const inputCompra: ICompraInput = {
      fecha: this.formularioCompra.get('fecha')?.value
    }

    this._compraService.crearCompra(idInmueble,idComercial, idComprador, idPropietario, inputCompra).subscribe({
      next: (data: ICompra) => {
        if (data) {
          this.compra = data;
          this.isPaying = true;
          alert("Se ha generado la cuenta de cobro :)")
        } else {
          alert("Ocurrio un error")
        }
      }, error: (error: any) => {
        console.log(error)
      }
    })
  }

  onRegresar(): void {
    this.formSubmitted.emit();
  }
}
