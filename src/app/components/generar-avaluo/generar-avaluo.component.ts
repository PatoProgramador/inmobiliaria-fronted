import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAvaluo, IAvaluoInput } from 'src/app/models/avaluo.model';
import { IInmueble } from 'src/app/models/inmueble.model';
import { AvaluoService } from 'src/app/services/avaluo.service';

@Component({
  selector: 'app-generar-avaluo',
  templateUrl: './generar-avaluo.component.html',
  styleUrls: ['./generar-avaluo.component.css']
})
export class GenerarAvaluoComponent {
  
  @Input() inmueble!: IInmueble;
  
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  formularioCrearAvaluo!: FormGroup;
  formularioConfig!:any[];
  action: string = 'Crear avaluo';
  loading: boolean = true;

  constructor(
    private _avaluoService: AvaluoService,
    private form: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formularioConfig = [
      { label: 'precio', placeholder: '15000000', type: 'text', formControlName: 'precio', controlType: 'input' },
      { label: 'detalles', placeholder: 'Avaluo generado con x entidad y estudo etc etc.', type: 'text', formControlName: 'detalles', controlType: 'textarea' }
    ];
    this.formularioCrearAvaluo = this.form.group({
      precio: ['', Validators.required],
      detalles: ['', Validators.required]
    })
  }

  onEnviar(): void {
    const inputAvaluo: IAvaluoInput = {
      descripcion: this.formularioCrearAvaluo.value.detalles,
      precio: this.formularioCrearAvaluo.value.precio
    }
    const idInmueble: number = Number(this.inmueble.id);
    console.log(idInmueble)
    this._avaluoService.crearAvaluo(idInmueble, inputAvaluo).subscribe({
        next: (data: IAvaluo) => {
          if (data) {
            alert("Avaluo creado correctamente")
            this.formSubmitted.emit();
          } else {
            alert("Ocurrio un error :0")
          }
          this.loading = false;
        } , error: (err: any) => {
          console.log(err);
          this.loading = false;
        }
    })

  }
  onRegresar(): void {
    this.formSubmitted.emit();
  }
}
