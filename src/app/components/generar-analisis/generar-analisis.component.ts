import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAnalisisRiesgo, IAnalisisRiesgoInput } from 'src/app/models/analisisRiesgo.model';
import { IInmueble } from 'src/app/models/inmueble.model';
import { AnalisisRiesgoService } from 'src/app/services/analisis-riesgo.service';

@Component({
  selector: 'app-generar-analisis',
  templateUrl: './generar-analisis.component.html',
  styleUrls: ['./generar-analisis.component.css']
})
export class GenerarAnalisisComponent {
  @Input() inmueble!: IInmueble;
  
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  formularioCrearAnalisis!: FormGroup;
  formularioConfig!:any[];
  action: string = 'Crear analisis de riesgo';
  loading: boolean = true;

  constructor(
    private _analisisRiesgoService: AnalisisRiesgoService,
    private form: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formularioConfig = [
      { label: 'detalles', placeholder: 'Analisis generado y aprobador por x y z...', type: 'text', formControlName: 'detalles', controlType: 'textarea' }
    ];
    this.formularioCrearAnalisis = this.form.group({
      detalles: ['', Validators.required]
    })
  }

  onEnviar(): void {
    const inputAnalisis: IAnalisisRiesgoInput = {
      descripcion: this.formularioCrearAnalisis.value.detalles,
    }
    const idInmueble: number = Number(this.inmueble.id);
    console.log(idInmueble)
    this._analisisRiesgoService.crearAnalisis(idInmueble, inputAnalisis).subscribe({
        next: (data: IAnalisisRiesgo) => {
          if (data) {
            alert("Creado :), se genero la cuenta de cobro correpondiente.")
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
