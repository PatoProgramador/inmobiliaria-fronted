import { Component, OnInit } from '@angular/core';
import { ICiudad } from 'src/app/models/ciudad.model';
import { CatalogService } from 'src/app/services/catalog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ciudadList: ICiudad[] = [];

  constructor(private _catalogService: CatalogService) {}

  ngOnInit(): void {
    this._catalogService.traerTodasLasCiudades().subscribe((data:ICiudad[]) => {
      this.ciudadList = data;
    })
  }
}
