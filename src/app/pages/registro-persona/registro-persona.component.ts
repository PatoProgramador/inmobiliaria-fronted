import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ICatalogo } from 'src/app/models/catalogo.model';
import { IPersona } from 'src/app/models/persona.model';
import { IPersonaInput } from 'src/app/models/personaInput.model';
import { ISucursal } from 'src/app/models/sucursal.model';
import { AppService } from 'src/app/services/app.service';
import { CatalogService } from 'src/app/services/catalog.service';
import { PersonaService } from 'src/app/services/persona.service';
import { SucursalService } from 'src/app/services/sucursal.service';

@Component({
  selector: 'app-registro-persona',
  templateUrl: './registro-persona.component.html',
  styleUrls: ['./registro-persona.component.css']
})
export class RegistroPersonaComponent implements OnInit {

  tiposDocumento: ICatalogo[] = [];
  tiposPersona: ICatalogo[] = [];
  sucursales: ISucursal[] = [];
  isDataLoaded$ = new BehaviorSubject<boolean>(false);
  formularioRegistro: FormGroup;
  formularioConfig!: any[];
  loading: boolean = false;

  constructor(private form: FormBuilder,
    private _appService: AppService,
    private _catalogService: CatalogService,
    private _sucursalService: SucursalService,
    private _personaService: PersonaService,
    private router: Router
  ) {
    this.formularioRegistro = this.form.group({
      identificacion: ['', Validators.required],
      tipoPersona: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      sucursal: ['', Validators.required],
      nombre: ['', Validators.required],
      documento: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  ngOnInit(): void {
    this._catalogService.traerTodosLosTiposDeDocumento().subscribe({
      next: (data: ICatalogo[]) => {
        this.tiposDocumento = data;
        console.log(this.tiposDocumento)
        this.checkDataLoaded();
      }, error: (err: any) => {
        console.log(err);
        this.loading = false;
      }
    })
    this._catalogService.traerTodoslosTiposPersona().subscribe({
      next: (data: ICatalogo[]) => {
        this.tiposPersona = data;
        console.log(this.tiposPersona)
        this.checkDataLoaded();
      }, error: (err: any) => {
        console.log(err);
        this.loading = false;
      }
    })
    this._sucursalService.traerTodasLasSucursales().subscribe({
      next: (data: ISucursal[]) => {
        this.sucursales = data;
        console.log(this.sucursales)
        this.checkDataLoaded();
      }, error: (err: any) => {
        console.log(err);
        this.loading = false;
      }
    })
  }

  checkDataLoaded() {
    if (this.tiposDocumento.length && this.tiposPersona.length && this.sucursales.length) {
      this.formularioConfig = [
        { label: 'Tipo de Persona', formControlName: 'tipoPersona', options: this.tiposPersona, controlType: 'select' },
        { label: 'Nombres', placeholder: 'Pato patoso', type: 'text', formControlName: 'nombre', controlType: 'input' },
        { label: 'Tipo de Documento', formControlName: 'tipoDocumento', options: this.tiposDocumento, controlType: 'select' },
        { label: 'Documento', placeholder: '00000000', type: 'text', formControlName: 'documento', controlType: 'input' },
        { label: 'Correo', placeholder: 'elPato@gmail.com', type: 'email', formControlName: 'correo', controlType: 'input' },
        { label: 'Telefono', placeholder: '000 000 0000', type: 'text', formControlName: 'telefono', controlType: 'input' },
        { label: 'Sucursal', formControlName: 'sucursal', options: this.sucursales, controlType: 'select' }
      ];
      this.isDataLoaded$.next(true);
      this.loading = false;
    }
  }

  onEnviar() {
    const personaInput: IPersonaInput = {
      nombre : this.formularioRegistro.value.nombre,
      identificacion: this.formularioRegistro.value.documento,
      telefono: this.formularioRegistro.value.telefono,
      correo: this.formularioRegistro.value.correo
    }
    const idTipoPersona: number = Number(this.formularioRegistro.value.tipoPersona);
    const idTipoIdentificacion: number = Number(this.formularioRegistro.value.tipoDocumento);
    const idSucursal: number = Number(this.formularioRegistro.value.sucursal);

    this._personaService.crearPersona(idTipoPersona, idTipoIdentificacion, idSucursal, personaInput).subscribe({
      next: (data:IPersona) => {
        if (data) {
          this._appService.setPersonaLog(data);
          this._appService.login();
          alert("logiao :)")
          this.router.navigate(['home']);
        } else {
          alert("fallo alguito")
        }
      }
    })
  }
}
