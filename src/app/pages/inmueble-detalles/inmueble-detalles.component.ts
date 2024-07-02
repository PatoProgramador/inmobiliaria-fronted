import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IInmueble } from 'src/app/models/inmueble.model';
import { IPersona } from 'src/app/models/persona.model';
import { AppService } from 'src/app/services/app.service';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-inmueble-detalles',
  templateUrl: './inmueble-detalles.component.html',
  styleUrls: ['./inmueble-detalles.component.css']
})
export class InmuebleDetallesComponent implements OnInit {

  inmueble!: IInmueble;
  comerciales!: IPersona[];
  comercialEncargado!: IPersona;
  propietario!: IPersona;
  loading: boolean = true;
  isLoged: boolean = false;
  isOwner: boolean = false;
  
  imagenPar: string = 'assets/images/bedfb7dbe443427334f9da08d74b39f4.png';
  imagenImpar: string = 'assets/images/casa-los-simpsons.jpg';
  
  isCita = false;
  isCompra = false;
  isArriendo = false;

  constructor(private _inmuebleService: InmuebleService,
    private _route: ActivatedRoute,
    private _appService: AppService,
    private _personaService: PersonaService,
  ) {}

  // modal de compra
  onCompra(): void {
    this.isCompra = true;
  }

  onCompraSubmit(): void {
    this.isCompra = false;
  }
  // modal de cita
  onCita(): void {
    this.isCita = true;
  }

  onFormSubmitted(): void {
    this.isCita = false;
  }
  // modal de arriendo
  onArriendo(): void {
    this.isArriendo = true;
  }

  onArriendoSubmit(): void {
    this.isArriendo = false;
  }
  
  ngOnInit(): void {
    if (this._appService.getPersonaLog()) {
      this.isLoged = true;
    }
    
    this._route.params.subscribe({
      next: (params: Params) => {
        this.loadInmuebleData(params['productId']);
      }
    });
  }

  private loadInmuebleData(productId: number): void {
    const inmueble$ = this._inmuebleService.traerInmueblePorId(productId);
    const propietario$ = this._inmuebleService.traerPropietario(productId);
    const comerciales$ = this._personaService.traerTodosLosComerciales();

    inmueble$.subscribe({
      next: (data: IInmueble) => {
        this.inmueble = data;
        this.checkLoading();
      }, error: (error: any) => {
        console.log(error);
        this.loading = false;
      }
    });

    propietario$.subscribe({
      next: (data: IPersona) => {
        this.propietario = data;
        this.checkLoading();
      }, error: (error: any) => {
        console.log(error);
        this.loading = false;
      }
    });

    comerciales$.subscribe({
      next: (data: IPersona[]) => {
        this.comerciales = data;
        this.checkLoading();
      }, error: (error: any) => {
        console.log(error);
        this.loading = false;
      }
    });
  }

  private checkLoading(): void {
    if (this.inmueble && this.propietario && this.comerciales) {
      if (this._appService.getPersonaLog()?.id == this.inmueble.id_Propietario) {
        this.isOwner = true;
      }
      this.loading = false;
    }
  }
}
