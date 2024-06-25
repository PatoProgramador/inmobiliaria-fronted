import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IInmueble } from 'src/app/models/inmueble.model';
import { InmuebleService } from 'src/app/services/inmueble.service';

@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styleUrls: ['./inmuebles.component.css']
})
export class InmueblesComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
    private _inmuebleService: InmuebleService
  ) {}

  inmuebles: IInmueble[] = [];
  loading: boolean = true;

  ngOnInit(): void {
    this._route.params.subscribe({
      next: (params: Params) => {
        this._inmuebleService.traerInmueblesPorCiudad(params['ciudad']).subscribe({
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
    })
  }
}
