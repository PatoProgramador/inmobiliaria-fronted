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
    AgendarCitaComponent
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
