import {DatePipe} from "@angular/common";
/*
Example Value
Schema
{
  "ci": "string",
  "nombre": "string",
  "apellido": "string",
  "fch_Nac": "2023-11-25T19:58:54.583Z",
  "direccion": "string",
  "telefono": "string",
  "email": "string",
  "password": "string",
  "esAdmin": true
}
*/
export class Funcionarios{
  ci:string;
  nombre:string;
  apellido:string;
  fch_Nac:Date;
  direccion:string;
  telefono:string;
  email:string;
  pasword:string;
  esAdmin:boolean;
  constructor(
    ced:string,
    name:string,
    surname:string,
    dateborn:Date,
    adress:string,
    phone:string,
    email:string,
    password:string,
    esAdmin:boolean) {
    this.ci = ced;
    this.nombre = name;
    this.apellido = surname;
    this.fch_Nac = dateborn;
    this.direccion =adress;
    this.telefono = phone;
    this.email = email;
    this.pasword = password;
    this.esAdmin = esAdmin;
  }
  public getFormattedDate(){
    let fecha = new DatePipe('en-US')
    let fc = fecha.transform(this.fch_Nac,'yyyy-MM-ddTHH:mm:ss.SSSZ')
    if(typeof fc === 'string'){ return fc};
    return "";
  }
}
