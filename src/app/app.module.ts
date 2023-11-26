import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoggedhubComponent } from './components/loggedhub/loggedhub.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HeaderComponent } from './components/header/header.component';
import {authGuard} from "./services/routeguard/auth.guard";
import { FechaPipe } from './pipe/fecha/fecha.pipe';
import { AgendaComponent } from './components/hubpages/agenda/agenda.component';
import { CarnetsaludComponent } from './components/hubpages/carnetsalud/carnetsalud.component';
import { ActualizardatosComponent } from './components/hubpages/actualizardatos/actualizardatos.component';
import { AbrirperiodoComponent } from './components/hubpages/admin/abrirperiodo/abrirperiodo.component';
import { ObtenerpendientesComponent } from './components/hubpages/admin/obtenerpendientes/obtenerpendientes.component';
import { ErrorpageComponent } from './components/hubpages/errorpage/errorpage.component';
import {adminGuard} from "./services/adminguard/admin.guard";

const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch: 'full'},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  { path:'hub',
    component:LoggedhubComponent,
    canActivate: [authGuard],
    children:[
      {path: 'agendarme', component:AgendaComponent, canActivate: [authGuard]},
      {path: 'carnetsalud', component:CarnetsaludComponent, canActivate: [authGuard]},
      {path: 'datospersonales', component:ActualizardatosComponent, canActivate: [authGuard]},
      {path: 'admin/periodos', component:ActualizardatosComponent, canActivate: [authGuard,adminGuard]},
      {path: 'admin/listardesactualizados', component:ActualizardatosComponent, canActivate: [authGuard, adminGuard]},

    ]
  },
  {path:'**', redirectTo:'/login', pathMatch: 'full'},

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LoggedhubComponent,
    HeaderComponent,
    FechaPipe,
    AgendaComponent,
    CarnetsaludComponent,
    ActualizardatosComponent,
    AbrirperiodoComponent,
    ObtenerpendientesComponent,
    ErrorpageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
