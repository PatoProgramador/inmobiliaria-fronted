import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IInmueble } from 'src/app/models/inmueble.model';
import { IInmuebleInput } from 'src/app/models/inmuebleInput.mode';
import { AppService } from 'src/app/services/app.service';
import { InmuebleService } from 'src/app/services/inmueble.service';

@Component({
  selector: 'app-editar-inmueble',
  templateUrl: './editar-inmueble.component.html',
  styleUrls: ['./editar-inmueble.component.css']
})
export class EditarInmuebleComponent implements OnInit {
  
  @Input() inmueble!: IInmueble;
  
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  formularioEditarInmueble!: FormGroup;
  formularioConfig!:any[];
  action: string = 'editar';
  loading: boolean = true;

  constructor(
    private _inmuebleService: InmuebleService,
    private form: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formularioConfig = [
      { label: 'direccion', placeholder: 'Cra 00 no 00 - 00', type: 'text', formControlName: 'direccion', controlType: 'input' },
      { label: 'detalles', placeholder: 'Casa de x m2 con x cantidad de baños, etc, etc.', type: 'text', formControlName: 'detalles', controlType: 'textarea' }
    ];
    this.formularioEditarInmueble = this.form.group({
      detalles: [this.inmueble.detalles],
      direccion: [this.inmueble.direccion]
    })
  }

  onEnviar(): void {
    const inputInmueble: IInmuebleInput = {
      direccion: this.formularioEditarInmueble.get('direccion')?.value,
      detalles: this.formularioEditarInmueble.get('detalles')?.value
    }
    this._inmuebleService.editarInmueble(this.inmueble.id, 0, inputInmueble).subscribe({
        next: (data: IInmueble) => {
          if (data) {
            alert("editao :)")
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
