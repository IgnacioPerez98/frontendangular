import {DatePipe} from "@angular/common";

export class Agenda{
  numero:number;
  ci:string|null;
  fecha_Agenda:Date;
  estaReservado:boolean;

  constructor(numero: number, ci: string | null, fecha_Agenda: Date, estaReservado: boolean) {
    this.numero = numero;
    this.ci = ci;
    this.fecha_Agenda = fecha_Agenda;
    this.estaReservado = estaReservado;
  }
  public getFormattedDate(){
    let fecha = new DatePipe('en-US')
    let fc = fecha.transform(this.fecha_Agenda,'yyyy-MM-ddTHH:mm:ss.SSSZ')
    if(typeof fc === 'string'){ return fc};
    return "";
  }
}
