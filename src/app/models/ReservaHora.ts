export class ReservaHora{
  numero:number;
  ci:string;
  fecha_Agenda:Date;
  estaReservado:boolean;

  constructor(numero: number, ci: string, fecha_Agenda: Date, estaReservado: boolean) {
    this.numero = numero;
    this.ci = ci;
    this.fecha_Agenda = fecha_Agenda;
    this.estaReservado = estaReservado;
  }
}
