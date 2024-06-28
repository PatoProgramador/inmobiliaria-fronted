import { Component, OnInit } from '@angular/core';
import { IInmueble } from 'src/app/models/inmueble.model';
import { AppService } from 'src/app/services/app.service';
import { InmuebleService } from 'src/app/services/inmueble.service';

@Component({
  selector: 'app-persona-inmueble',
  templateUrl: './persona-inmueble.component.html',
  styleUrls: ['./persona-inmueble.component.css']
})
export class PersonaInmuebleComponent implements OnInit {

  personasInmueble!: IInmueble[];
  loading: boolean = true;

  constructor(private _inmuebleService: InmuebleService,
    private _appService: AppService
  ) { }

  ngOnInit(): void {
      this._inmuebleService.traerInmueblePorPersona(this._appService.personaLogueada!.id).subscribe({
        next: (data: IInmueble[]) => {
          this.personasInmueble = data;
          this.loading = false;
        },
        error: (error: any) => {
          console.log(error);
          this.loading = false;
        }
      })
  }
}
