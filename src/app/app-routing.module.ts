import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InmueblesComponent } from './pages/inmuebles/inmuebles.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { RegistroPersonaComponent } from './pages/registro-persona/registro-persona.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { PersonaInmuebleComponent } from './pages/persona-inmueble/persona-inmueble.component';
import { PublicarInmuebleComponent } from './pages/publicar-inmueble/publicar-inmueble.component';
import { ListarPersonaComponent } from './pages/listar-persona/listar-persona.component';
import { InmuebleDetallesComponent } from './pages/inmueble-detalles/inmueble-detalles.component';
import { PagosPendientesComponent } from './pages/pagos-pendientes/pagos-pendientes.component';
import { PagoComponent } from './pages/pago/pago.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'inmuebles', component: InmueblesComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'registro-persona', component: RegistroPersonaComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'persona-inmuebles', component: PersonaInmuebleComponent},
  {path: 'publicar-inmueble', component: PublicarInmuebleComponent},
  {path: 'lista-personas', component: ListarPersonaComponent},
  {path: 'pagos-pendientes', component: PagosPendientesComponent},
  {path: 'inmueble-detalles/:productId', component: InmuebleDetallesComponent},
  {path: 'pago/:cuentaId', component: PagoComponent},
  {path: '**', redirectTo:'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
