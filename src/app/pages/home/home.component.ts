import { Component, OnInit } from '@angular/core';
import { ICatalogo } from 'src/app/models/catalogo.model';
import { AppService } from 'src/app/services/app.service';
import { CatalogService } from 'src/app/services/catalog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ciudadList: ICatalogo[] = [];

  constructor(private _catalogService: CatalogService,
    private _appService: AppService
  ) {}

  ngOnInit(): void {
    this._catalogService.traerTodasLasCiudades().subscribe((data:ICatalogo[]) => {
      this.ciudadList = data;
    })
  }

  setearCiudad(ciudad:string):void {
    this._appService.setCiudad(ciudad);
  }
}
