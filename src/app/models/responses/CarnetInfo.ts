export class CarnetInfo{
  ci:string;
  fecha_Emision:Date;
  fecha_Vencimiento:Date;

  constructor(ci: string, fecha_Emision: Date, fecha_Vencimiento: Date) {
    this.ci = ci;
    this.fecha_Emision = fecha_Emision;
    this.fecha_Vencimiento = fecha_Vencimiento;
  }
}
