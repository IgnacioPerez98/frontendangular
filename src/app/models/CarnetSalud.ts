export class CarnetSalud{
  cedula:string;
  fecha_Emision:Date;
  Fecha_Vencimiento:Date;
  image:ImageBitmap;//Ver si es este tipo u otro ni idea.
  constructor(cedula: string, fecha_Emision: Date, Fecha_Vencimiento: Date, image: ImageBitmap) {
    this.cedula = cedula;
    this.fecha_Emision = fecha_Emision;
    this.Fecha_Vencimiento = Fecha_Vencimiento;
    this.image = image;
  }


}
