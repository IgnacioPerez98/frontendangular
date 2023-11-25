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

const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch: 'full'},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'hub', component:LoggedhubComponent},
  {path:'**', redirectTo:'/login', pathMatch: 'full'},//Cuando hay error

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LoggedhubComponent,
    HeaderComponent
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
