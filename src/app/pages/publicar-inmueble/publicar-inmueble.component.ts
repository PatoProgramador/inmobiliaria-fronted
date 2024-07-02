import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IInmueble } from 'src/app/models/inmueble.model';
import { IInmuebleInput } from 'src/app/models/inmuebleInput.mode';
import { IPersona } from 'src/app/models/persona.model';
import { AppService } from 'src/app/services/app.service';
import { InmuebleService } from 'src/app/services/inmueble.service';

@Component({
  selector: 'app-publicar-inmueble',
  templateUrl: './publicar-inmueble.component.html',
  styleUrls: ['./publicar-inmueble.component.css']
})

export class PublicarInmuebleComponent implements OnInit {

  formularioCrearInmueble!: FormGroup;
  formularioConfig!:any[];
  logPersona?: IPersona;
  loading: boolean = true;
  action: string = 'crear inmueble';
  imagenPar: string = 'assets/images/bedfb7dbe443427334f9da08d74b39f4.png';
  imagenImpar: string = 'assets/images/casa-los-simpsons.jpg';

  constructor(private _appService: AppService,
    private _inmuebleService: InmuebleService,
    private form: FormBuilder
  ) {
    this.formularioConfig = [
      { label: 'direccion', placeholder: 'Cra 00 no 00 - 00', type: 'text', formControlName: 'direccion', controlType: 'input' },
      { label: 'detalles', placeholder: 'Casa de x m2 con x cantidad de baños, etc, etc.', type: 'text', formControlName: 'detalles', controlType: 'textarea' }
    ];
    this.formularioCrearInmueble = this.form.group({
      detalles: ['', Validators.required],
      direccion: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.logPersona = this._appService.getPersonaLog();
  }

  onEnviar(): void {

    if (this.logPersona?.id) {
      this._inmuebleService.crearInmueble(this.logPersona?.id, this.formularioCrearInmueble.value).subscribe({
        next: (data: IInmueble) => {
          if (data) {
            alert("creao :)")
          } else {
            alert("Ocurrio un error :0")
          }
          this.loading = false;
        } , error: (err: any) => {
          console.log(err);
          this.loading = false;
        }
      })
    } else {
      alert("Aun no estas logueado X_X")
    }
  }
}
