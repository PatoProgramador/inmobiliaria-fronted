import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICatalogo } from 'src/app/models/catalogo.model';
import { IPersona } from 'src/app/models/persona.model';
import { AppService } from 'src/app/services/app.service';
import { CatalogService } from 'src/app/services/catalog.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  tiposDocumento: ICatalogo[] = [];
  loading: boolean = false;
  formularioLogin: FormGroup;
  exists: boolean = false;
  persona?: IPersona | null;
  action: string = 'iniciar sesión'

  constructor(private _catalogService: CatalogService,
    private _personaService: PersonaService,
    private _appService: AppService,
    private form: FormBuilder,
    private router: Router
  ) {
    this.formularioLogin = this.form.group({
      tipoDocumento: ['', Validators.required],
      documento: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  ngOnInit(): void {
    this._catalogService.traerTodosLosTiposDeDocumento().subscribe({
      next: (data: ICatalogo[]) => {
        this.tiposDocumento = data;
      }, error: (err: any) => {
        console.log(err);
        this.loading = false;
      }
    })
  }

  enviar() {
    const documento: string = this.formularioLogin.get('documento')?.value;
    const tipoDocumento: number = Number(this.formularioLogin.get('tipoDocumento')?.value);

    this._personaService.traerPersonaPorTipoDocumento(tipoDocumento, documento).subscribe({
      next: (data: IPersona) => {
        this.persona = data? data: null;
        // logica jeje
        if (this.persona) {
          this._appService.setPersonaLog(this.persona);
          this._appService.login();
          this._appService.verificarRol();
          alert("SI EXISTE")
          this.router.navigate(['home']);
        } else {
          this.router.navigate(['registro-persona']);
        }
      }, error: (err: any) => {
        console.log(err);
        this.loading = false;
      }
    })
  }
}
