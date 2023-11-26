import {FechaPipe, TipoFecha} from "../pipe/fecha/fecha.pipe";

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
    let fecha = new FechaPipe();
    console.log(this.fch_Nac)
    console.log(fecha.transform(this.fch_Nac,TipoFecha.FechaYHora))
    return fecha.transform(this.fch_Nac,TipoFecha.FechaYHora);
  }
}
