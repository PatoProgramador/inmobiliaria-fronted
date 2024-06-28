import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IInmueble } from 'src/app/models/inmueble.model';
import { AppService } from 'src/app/services/app.service';
import { InmuebleService } from 'src/app/services/inmueble.service';

@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styleUrls: ['./inmuebles.component.css']
})
export class InmueblesComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
    private _inmuebleService: InmuebleService,
    private _appService: AppService
  ) {}

  inmuebles: IInmueble[] = [];
  loading: boolean = true;
  imagenPar: string = 'assets/images/bedfb7dbe443427334f9da08d74b39f4.png';
  imagenImpar: string = 'assets/images/casa-los-simpsons.jpg';

  ngOnInit(): void {   
    this._inmuebleService.traerInmueblesPorCiudad(this._appService.getCiudad()).subscribe({
      next: (data: IInmueble[]) => {
        this.inmuebles = data;
        this.loading = false;
      },
      error: (error: any) => {
        console.log(error);
        this.loading = false;
      }
    })
  }
}
