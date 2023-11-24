import { Injectable } from '@angular/core';
import {Funcionarios} from "../../models/Funcionarios";
import {CookieService} from "ngx-cookie-service";
import {SHA512Service} from "../hashing/sha512.service";
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {Agenda} from "../../models/responses/Agenda";

@Injectable({
  providedIn: 'root'
})
export class DataapiService {

  API_ENDPOINT:string = "https://www.backbasesdatos.duckdns.org/api/";
  constructor(
    private http:HttpClient,
    private cookie:CookieService,
    private hash :SHA512Service
  ) { }

  public crearFuncionarios(func:Funcionarios){
    const ending = 'funcionarios/funcionario'
    const header = {
      'accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${this.cookie.get('token')}`
    }
    const hashedPass =  this.hash.EncryptSHA512(func.pasword);
    const body = {
      "ci": `${func.ci}`,
      "nombre": `${func.nombre}`,
      "apellido": `${func.apellido}`,
      "fch_Nac": `${func.getFormattedDate()}`,
      "direccion": `${func.direccion}`,
      "telefono": `${func.telefono}`,
      "email": `${func.email}`,
      "password": `${hashedPass}` //lo mando hasheado
    }
    return this.http.post<any>(this.API_ENDPOINT+ending, body,{headers:header});
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

}
