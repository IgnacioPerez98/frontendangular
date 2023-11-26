import {FechaPipe, TipoFecha} from "../pipe/fecha/fecha.pipe";
import {loadIsReferencedAliasDeclarationPatch} from "@angular/compiler-cli/src/ngtsc/imports";
import {ValidateService} from "../services/validate/validate.service";

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
    return fecha.transform(this.fch_Nac,TipoFecha.FechaYHora);
  }
  public datosOk(){
    let v = new ValidateService();
    if (v.isNullorEmpty(this.ci)) return "Cedula vacia.";
    if (v.isNullorEmpty(this.nombre))return "Nombre vacio.";
    if (v.isNullorEmpty(this.apellido)) return "Apellido vacio.";
    if (v.isNullorEmpty(this.direccion)) return "Direccion vacia.";
    if (v.isNullorEmpty(this.telefono)) return "Telefono vacio.";
    if (v.isNullorEmpty(this.email)) return "Email vacio.";
    if (v.isNullorEmpty(this.pasword)) return "Cantraseña vacia.";
    if( this.fch_Nac === null) return "Seleccione una fecha de nacimiento";
    if( this.fch_Nac.toString() === "Invalid Date") return "Seleccione una fecha de nacimiento";

    return true;
  }
}
