import {Injectable} from '@angular/core';
import {Funcionarios} from "../../models/Funcionarios";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {UpdateFuncionario} from "../../models/requests/UpdateFuncionario";
import {PeriodosDisponibles} from "../../models/responses/PeriodosDisponibles";
import {AuthService} from "../auth/auth.service";
import {PeriodoEspecial} from "../../models/PeriodoEspecial";
import {ValidateService} from '../validate/validate.service';
import {ReservaHora} from 'src/app/models/ReservaHora';
import {FechaPipe, TipoFecha} from "../../pipe/fecha/fecha.pipe";
import {CarnetSalud} from "../../models/CarnetSalud";
import {CarnetInfo} from "../../models/responses/CarnetInfo";
import {Agenda} from "../../models/responses/Agenda";

@Injectable({
  providedIn: 'root'
})
export class DataapiService {

  API_ENDPOINT:string = "http://localhost:8080/api/";
  constructor(
    private http:HttpClient,
    private cookie:CookieService,
    private auth :AuthService,
    private validateService:ValidateService
  ) { }
  //***********************************************************************************
  //Carnet Salud - 3 endpoints
  //***********************************************************************************

  public enviarCarnet(carnet:CarnetSalud){
    const pipe = new FechaPipe();
    const ending  = "carnetsalud/cargarcarnetsalud";
    const header = {
     'accept': '*/*',
     'Content-Type': 'application/json',
     'Authorization' : `Bearer ${this.cookie.get('token')}`
    }
    const body ={
     "ci": "string",
     "fecha_Emision": "2023-11-26T14:35:26.959Z",
     "fecha_Vencimiento": "2023-11-26T14:35:26.959Z",
     "image": "string"
    }
    return this.http.post<any>(this.API_ENDPOINT+ending , body, {headers:header});
  }

  public obtenerDatosCarnet(ci : string){
    let  ending = `carnetsalud/obtenercarnet/${ci}`
    const header = {
      'accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${this.cookie.get('token')}`
    }
    return this.http.get<CarnetInfo>(this.API_ENDPOINT+ending, {headers:header,responseType:'json'});
  }

  public obtenerImagenBase64(ci:string){
    let  ending = `carnetsalud/imagencarnet/${ci}`
    const header = {
      'accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${this.cookie.get('token')}`
    }
    return this.http.get(this.API_ENDPOINT+ending, {headers:header, responseType:'text'});
  }

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
      "password": `${func.pasword}`,
      "esAdmin" : func.esAdmin
    }
    return this.http.post<any>(this.API_ENDPOINT+ending, body,{headers:header});
  }
  public  actualizarDatosFuncionarioActual(func:UpdateFuncionario){
    const ending= 'funcionarios/funcionarioactual';
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
    return this.http.patch(this.API_ENDPOINT+ending,body,{headers:header, responseType:'text'});
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
    return this.http.get<any[]>(this.API_ENDPOINT+ending,{headers:header});
  }

  public  getFechasDisponibles(inicio :Date, final:Date){
    const pipe = new FechaPipe();
    const header = {
      'accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${this.cookie.get('token')}`
    }
    const ending = `clinica/fechasdisponibles/${pipe.transform(inicio, TipoFecha.SoloFecha)}/${pipe.transform(final,TipoFecha.SoloFecha)}`;
    return this.http.get<Agenda[]>(this.API_ENDPOINT+ending, {headers:header});
  }
  public reservarHora(turno:ReservaHora,inicPeriodo:Date, finPeriodo:Date){
    const pipe = new FechaPipe();
    const ending = `clinica/reservarhora/${pipe.transform(inicPeriodo, TipoFecha.SoloFecha)}/${pipe.transform(finPeriodo,TipoFecha.SoloFecha)}`
    const header = {
      'accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${this.cookie.get('token')}`
    }
    const body = {
      "numero": turno.numero,
      "ci": `${turno.ci}`,
      "fecha_Agenda": `${pipe.transform(turno.fecha_Agenda,TipoFecha.FechaYHora)}`,
      "estaReservado": turno.estaReservado
    }
    return this.http.post(this.API_ENDPOINT+ending, body, {headers:header,responseType: 'text'});
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
      const pipe = new FechaPipe();
      const body = {
        "anio": periodo.anio,
        "semestre": periodo.semestre,
        "fch_Inicio" : pipe.transform(periodo.fch_Inicio,TipoFecha.FechaYHora) ,
        "fch_Fin": pipe.transform(periodo.fch_Fin,TipoFecha.FechaYHora)
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
