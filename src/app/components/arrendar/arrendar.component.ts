import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IArriendo, IArriendoInput } from 'src/app/models/arriendo.model';
import { IInmueble } from 'src/app/models/inmueble.model';
import { IPersona } from 'src/app/models/persona.model';
import { AppService } from 'src/app/services/app.service';
import { ArriendoService } from 'src/app/services/arriendo.service';

@Component({
  selector: 'app-arrendar',
  templateUrl: './arrendar.component.html',
  styleUrls: ['./arrendar.component.css']
})
export class ArrendarComponent {
  @Input() inmueble!: IInmueble;
  @Input() propietario!: IPersona;
  @Input() comerciales!: IPersona[];
  
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  formularioArriendo!: FormGroup;
  loading: boolean = true;
  formularioConfig!: any[];
  action: string = 'arrendar';
  compra!: IArriendo;
  isPaying: Boolean = false;
  
  constructor(private form: FormBuilder,
    private _appService: AppService,
    private _arriendoService: ArriendoService
  ) { }

  ngOnInit(): void {
    this.formularioArriendo = this.form.group({
      comercial: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_final: [''],
      monto: [{ value: this.inmueble.precio * 0.05, disabled: true }],
      descripcion: ['', Validators.required]
    });

    this.formularioConfig = [
      { label: 'Fecha de inicio', formControlName: 'fecha_inicio', type: 'date', controlType: 'input' },
      { label: 'Fecha final (puedes dejarlo vacio si no hay fecha final)', formControlName: 'fecha_final', type: 'date', controlType: 'input' },
      { label: 'Descripción', placeholder: 'Arriendo pactado con posibilidad de modificar x fecha....', type: 'text', formControlName: 'descripcion', controlType: 'textarea' },
      { label: 'Pago mensual (5% del valor del inmueble)', formControlName: 'monto', type: 'text', controlType: 'input' },
      { label: 'Comercial encargado', formControlName: 'comercial', options: this.comerciales, controlType: 'select' },
    ];
  }

  onEnviar(): void {
    const idInmueble: number = Number(this.inmueble.id);
    const idComercial: number = Number(this.formularioArriendo.value.comercial);
    const idPropietario: number = Number(this.propietario.id);
    const idComprador: number = Number(this._appService.getPersonaLog()?.id);
    const inputArriendo: IArriendoInput = {
      fechaInicio: this.formularioArriendo.value.fecha_inicio,
      fechaFinal: this.formularioArriendo.get('fecha_final')?.value,
      detalles: this.formularioArriendo.value.descripcion,
      monto: this.formularioArriendo.get('monto')?.value
    }

    this._arriendoService.crearArriendo(idInmueble, idComercial, idComprador, idPropietario, inputArriendo).subscribe({
      next: (data: IArriendo) => {
        if (data) {
          this.compra = data;
          this.isPaying = true;
          alert("Se ha generado la cuenta correspondiente al primer mes :)")
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
