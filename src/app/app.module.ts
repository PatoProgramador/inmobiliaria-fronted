import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { InmueblesComponent } from './pages/inmuebles/inmuebles.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistroComponent } from './pages/registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroPersonaComponent } from './pages/registro-persona/registro-persona.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { PersonaFormComponent } from './components/persona-form/persona-form.component';
import { InmueblesCardComponent } from './components/inmuebles-card/inmuebles-card.component';
import { PersonaInmuebleComponent } from './pages/persona-inmueble/persona-inmueble.component';
import { PublicarInmuebleComponent } from './pages/publicar-inmueble/publicar-inmueble.component';
import { ListarPersonaComponent } from './pages/listar-persona/listar-persona.component';
import { InmuebleDetallesComponent } from './pages/inmueble-detalles/inmueble-detalles.component';
import { AgendarCitaComponent } from './components/agendar-cita/agendar-cita.component';
import { ComprarComponent } from './components/comprar/comprar.component';
import { ArrendarComponent } from './components/arrendar/arrendar.component';
import { EditarInmuebleComponent } from './components/editar-inmueble/editar-inmueble.component';
import { GenerarAvaluoComponent } from './components/generar-avaluo/generar-avaluo.component';
import { GenerarAnalisisComponent } from './components/generar-analisis/generar-analisis.component';
import { PagosPendientesComponent } from './pages/pagos-pendientes/pagos-pendientes.component';
import { PagoCardComponent } from './components/pago-card/pago-card.component';
import { PagoComponent } from './pages/pago/pago.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    InmueblesComponent,
    RegistroComponent,
    RegistroPersonaComponent,
    PerfilComponent,
    PersonaFormComponent,
    InmueblesCardComponent,
    PersonaInmuebleComponent,
    PublicarInmuebleComponent,
    ListarPersonaComponent,
    InmuebleDetallesComponent,
    AgendarCitaComponent,
    ComprarComponent,
    ArrendarComponent,
    EditarInmuebleComponent,
    GenerarAvaluoComponent,
    GenerarAnalisisComponent,
    PagosPendientesComponent,
    PagoCardComponent,
    PagoComponent
  ], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
