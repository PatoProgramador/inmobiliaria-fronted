import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _appService: AppService) { }

  ciudad: string = '';

  ngOnInit(): void {
    console.log(this._appService.getCiudad())
      this.ciudad = this._appService.getCiudad();
  }
}
