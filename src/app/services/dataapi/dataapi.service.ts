import { Injectable } from '@angular/core';
import {Funcionarios} from "../../models/Funcionarios";
import {CookieService} from "ngx-cookie-service";
import {SHA512Service} from "../hashing/sha512.service";
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {Agenda} from "../../models/responses/Agenda";
import {UpdateFuncionario} from "../../models/requests/UpdateFuncionario";
import {end} from "@popperjs/core";
import {PeriodosDisponibles} from "../../models/responses/PeriodosDisponibles";
import {AuthService} from "../auth/auth.service";
import {PeriodoEspecial} from "../../models/PeriodoEspecial";

@Injectable({
  providedIn: 'root'
})
export class DataapiService {

  API_ENDPOINT:string = "http://localhost:8080/api/";
  constructor(
    private http:HttpClient,
    private cookie:CookieService,
    private auth :AuthService
  ) { }
  //***********************************************************************************
  //Funcionarios - 2 endpoints
  //***********************************************************************************
  public crearFuncionarios(func:Funcionarios){
    const ending = 'funcionarios/funcionario'
    const header = {
      'accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${this.cookie.get('token')}`
    }
    const body = {
      "ci": `${func.ci}`,
      "nombre": `${func.nombre}`,
      "apellido": `${func.apellido}`,
      "fch_Nac": `${func.getFormattedDate()}`,
      "direccion": `${func.direccion}`,
      "telefono": `${func.telefono}`,
      "email": `${func.email}`,
      "password": `${func.pasword}` //lo mando hasheado
    }
    return this.http.post<any>(this.API_ENDPOINT+ending, body,{headers:header});
  }
  public  actualizarDatosFuncionarioActual(func:UpdateFuncionario){
    const ending= 'funcionarios/funcionario';
    const header = {
      'accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${this.cookie.get('token')}`
    }
    const body = {
      "direccion": `${func.direccion}`,
      "telefono": `${func.telefono}`,
      "email": `${func.email}`,
      "password": `${func.password}`
    }
    return this.http.patch(this.API_ENDPOINT+ending,body,{headers:header});
  }


  //***********************************************************************************
  //Clinica UCU - 3 endpoints
  //***********************************************************************************
  public getPeriodosDisponibles(){
    const ending:string = 'clinica/periodos';
    const header = {
      'accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${this.cookie.get('token')}`
    }
    return this.http.get<PeriodosDisponibles[]>(this.API_ENDPOINT+ending,{headers:header});
  }

  public  getFechasDisponibles(inicio :Date, final:Date){
    const pipe = new DatePipe('en-US');
    const header = {
      'accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${this.cookie.get('token')}`
    }
    const ending = `carnetsalud/fechasdisponibles/${pipe.transform(inicio, 'yyyy-MM-dd')}/${pipe.transform(final,'yyyy-MM-dd')}`;
    return this.http.get(this.API_ENDPOINT+ending, {headers:header});
  }
  public reservarHora(turno:Agenda,inicPeriodo:Date, finPeriodo:Date){
    const pipe = new DatePipe('en-US');
    const ending = `carnetsalud/resrvarhora/${pipe.transform(inicPeriodo, 'yyyy-MM-dd')}/${pipe.transform(finPeriodo,'yyyy-MM-dd')}`
    const header = {
      'accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${this.cookie.get('token')}`
    }
    const body = {
      "numero": turno.numero,
      "ci": `${turno.ci}`,
      "fecha_Agenda": `${turno.getFormattedDate()}`,
      "estaReservado": turno.estaReservado
    }
    return this.http.post(this.API_ENDPOINT+ending, body,{headers:header});
  }


  //***********************************************************************************
  //Admin UCU - 2 endpoints
  //***********************************************************************************

  public abrirPeriodoEspecial(periodo:PeriodoEspecial){
      if(!this.esAdmin()) return;
      const ending:string = 'ucuadmin/periodoespecial';
      const header = {
        'accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${this.cookie.get('token')}`
      }
      const pipe = new DatePipe('en-US');
      const body = {
        "anio": periodo.anio,
        "semestre": periodo.semestre,
        "fch_Inicio" : pipe.transform(periodo.fch_Inicio,'yyyy-MM-ddTHH:mm:ss.SSSZ') ,
        "fch_Fin": pipe.transform(periodo.fch_Fin,'yyyy-MM-ddTHH:mm:ss.SSSZ')
      }
      return this.http.post(this.API_ENDPOINT+ending, body,{headers:header})
  }

  public obtenerListaFuncionariosDesactualizados(){
    if(!this.esAdmin()) return;
    const ending:string = 'ucuadmin/funcionariosdesactualizado';
    const header = {
      'accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${this.cookie.get('token')}`
    }
    return this.http.get(this.API_ENDPOINT+ending, {headers:header});
  }

  private esAdmin():boolean{
    const user: any  =this.auth.decodeToken(this.cookie.get('token'));
    if(user.rol === 'admin') return true;
    return false;
  }
}
