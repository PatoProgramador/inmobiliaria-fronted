import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InmueblesComponent } from './pages/inmuebles/inmuebles.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { RegistroPersonaComponent } from './pages/registro-persona/registro-persona.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'inmuebles', component: InmueblesComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'registro-persona', component: RegistroPersonaComponent},
  {path: '**', redirectTo:'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
