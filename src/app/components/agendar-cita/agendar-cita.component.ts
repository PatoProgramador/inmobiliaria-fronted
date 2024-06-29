import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICita } from 'src/app/models/cita.model';
import { ICitaInput } from 'src/app/models/citaInput.model';
import { IInmueble } from 'src/app/models/inmueble.model';
import { IPersona } from 'src/app/models/persona.model';
import { AppService } from 'src/app/services/app.service';
import { CitaService } from 'src/app/services/cita.service';

@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css']
})
export class AgendarCitaComponent implements OnInit {

  @Input() inmueble!: IInmueble;
  @Input() propietario!: IPersona;
  @Input() comerciales!: IPersona[];
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  formularioCita!: FormGroup;
  loading: boolean = true;
  formularioConfig!: any[];

  constructor(private form: FormBuilder,
    private _appService: AppService,
    private _citaService: CitaService
  ) { }

  ngOnInit(): void {
    this.formularioCita = this.form.group({
      comercial: ['', Validators.required],
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required]
    });

    this.formularioConfig = [
      { label: 'Fecha', formControlName: 'fecha', type: 'date', controlType: 'input' },
      { label: 'Descripción', placeholder: 'Para poder ver con más detalles x, y ,z ....', type: 'text', formControlName: 'descripcion', controlType: 'textarea' },
      { label: 'Comercial encargado', formControlName: 'comercial', options: this.comerciales, controlType: 'select' },
    ];
  }

  onEnviar() {
    const idInmueble: number = Number(this.inmueble.id);
    const idComercial: number = Number(this.formularioCita.value.comercial);
    const idPropietario: number = Number(this.propietario.id);
    const idComprador: number = Number(this._appService.getPersonaLog()?.id);

    const cita: ICitaInput = {
      fecha: this.formularioCita.value.fecha,
      descripcion: this.formularioCita.value.descripcion
    }

    this._citaService.crearCita(idInmueble,idComercial,idComprador,idPropietario, cita).subscribe({
      next: (data: ICita) => {
        if (data) {
          this.formSubmitted.emit();
          alert("Cita agendada :)");
        } else {
          alert("Ocurrio un error")
        }
      }, error: (error: any) => {
        console.log(error)
      }
    })

  }

}
