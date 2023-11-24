import {DatePipe} from "@angular/common";

export class Funcionarios{
  ci:string;
  nombre:string;
  apellido:string;
  fch_Nac:Date;
  direccion:string;
  telefono:string;
  email:string;
  pasword:string;
  constructor(
    ced:string,
    name:string,
    surname:string,
    dateborn:Date,
    adress:string,
    phone:string,
    email:string,
    password:string) {
    this.ci = ced;
    this.nombre = name;
    this.apellido = surname;
    this.fch_Nac = dateborn;
    this.direccion =adress;
    this.telefono = phone;
    this.email = email;
    this.pasword = password; // Encriptar.
  }
  public getFormattedDate(){
    let fecha = new DatePipe('en-US')
    let fc = fecha.transform(this.fch_Nac,'yyyy-MM-ddTHH:mm:ss.SSSZ')
    if(typeof fc === 'string'){ return fc};
    return "";
  }
}
