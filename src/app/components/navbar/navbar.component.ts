import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPersona } from 'src/app/models/persona.model';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _appService: AppService) { }

  isAuthenticated: boolean = false;
  private authSubscription?: Subscription;
  ciudad: string = '';
  persona?: IPersona = this._appService.getPersonaLog();
  esComercial: boolean = false;

  ngOnInit(): void {
    this.authSubscription = this._appService.isAuthenticated().subscribe(
      isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      }
    );
    this._appService.isComercial().subscribe(
      isComercial => {
        this.esComercial = isComercial;
      }
    )
    this.ciudad = this._appService.getCiudad();
  }
}
