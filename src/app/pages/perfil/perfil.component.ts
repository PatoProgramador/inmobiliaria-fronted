import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{

  formularioActualizacion!: FormGroup;
  tiposDocumento: ICatalogo[] = [];
  tiposPersona: ICatalogo[] = [];
  sucursales: ISucursal[] = [];
  isDataLoaded$ = new BehaviorSubject<boolean>(false);
  isEditing: boolean = false;
  formularioConfig!: any[];
  loading: boolean = false;

  constructor(private _appService: AppService,
    private form: FormBuilder,
    private _catalogService: CatalogService,
    private _sucursalService: SucursalService,
    private _personaService: PersonaService
  ) {}

  logPersona?: IPersona;

  ngOnInit(): void {
    this.logPersona = this._appService.getPersonaLog();
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
      const idTipoDocumento: string = String(this.tiposDocumento.filter(td => td.descripcion == this.logPersona?.tipoIdentificacion)[0].id)
      const idTipoPersona: string = String(this.tiposPersona.filter(tp => tp.descripcion == this.logPersona?.tipoPersona)[0].id)
      const idSucursal: string = String(this.sucursales.filter(s => s.nombre == this.logPersona?.sucursal)[0].id)
      this.formularioActualizacion = this.form.group({
        tipoPersona: [idTipoPersona],
        tipoDocumento: [idTipoDocumento],
        sucursal: [idSucursal],
        nombre: [this.logPersona?.nombre],
        documento: [this.logPersona?.identificacion],
        correo: [this.logPersona?.correo, Validators.email],
        telefono: [this.logPersona?.telefono, Validators.minLength(5)]
      })
      this.isDataLoaded$.next(true);
      this.loading = false;
    }
  }

  onEditar() {
    this.isEditing = true;
  }

  onEnviar() {
    console.log(this.formularioActualizacion)
    const personaInput: IPersonaInput = {
      nombre : this.formularioActualizacion.value.nombre,
      identificacion: this.formularioActualizacion.value.documento,
      telefono: this.formularioActualizacion.value.telefono,
      correo: this.formularioActualizacion.value.correo
    }

    const oldIdTipoDocumento: string = String(this.tiposDocumento.filter(td => td.descripcion == this.logPersona?.tipoIdentificacion)[0].id)
    const oldIdTipoPersona: string = String(this.tiposPersona.filter(tp => tp.descripcion == this.logPersona?.tipoPersona)[0].id)
    const oldIdSucursal: string = String(this.sucursales.filter(s => s.nombre == this.logPersona?.sucursal)[0].id)

    const newIdTipoPersona: number = Number(this.formularioActualizacion.value.tipoPersona == oldIdTipoPersona ? 0 : this.formularioActualizacion.value.tipoPersona);
    const newIdTipoIdentificacion: number = Number(this.formularioActualizacion.value.tipoDocumento == oldIdTipoDocumento ? 0 : this.formularioActualizacion.value.tipoDocumento);
    const newIdSucursal: number = Number(this.formularioActualizacion.value.sucursal == oldIdSucursal ? 0 : this.formularioActualizacion.value.sucursal);
    const idPersona: number = this.logPersona?.id || 0;

    this._personaService.modificarPersona(idPersona, newIdTipoPersona, newIdTipoIdentificacion, newIdSucursal, personaInput).subscribe({
      next: (data:IPersona) => {
        if (data) {
          this._appService.setPersonaLog(data);
          this._appService.login();
          this.logPersona = data;
          this.isEditing = false;
          alert("Actualizao :)")
        } else {
          alert("fallo alguito")
        }
      }
    })
  }
}
