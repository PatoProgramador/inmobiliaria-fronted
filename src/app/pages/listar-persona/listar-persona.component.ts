import { Component, OnInit } from '@angular/core';
import { IPersona } from 'src/app/models/persona.model';
import { AppService } from 'src/app/services/app.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-listar-persona',
  templateUrl: './listar-persona.component.html',
  styleUrls: ['./listar-persona.component.css']
})
export class ListarPersonaComponent implements OnInit {

  personas!:IPersona[];
  loading: boolean = false;

  constructor(private _appService: AppService,
    private _personaService: PersonaService
  ) {}

  ngOnInit(): void {
    this._personaService.traerPersonas().subscribe({
      next: (data: IPersona[]) => {
        if (data) {
          this.personas = data;
          this.loading = false;
        } else {
          alert("ocurrio un error jejeje")
        }
      },
      error: (error: any) => {
        console.log(error);
        this.loading = false;
      }
    })
  }
}
