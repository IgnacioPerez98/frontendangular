import {ValidateService} from "../services/validate/validate.service";

export class CarnetSalud{
  cedula:string;
  fecha_Emision:Date;
  Fecha_Vencimiento:Date;
  imagenBase64:string;
  constructor(cedula: string, fecha_Emision: Date, Fecha_Vencimiento: Date, image: string) {
    this.cedula = cedula;
    this.fecha_Emision = fecha_Emision;
    this.Fecha_Vencimiento = Fecha_Vencimiento;
    this.imagenBase64 = image;
  }

  validarDatos(){
    const v = new ValidateService();
    if (v.isNullorEmpty(this.cedula)) return "La cédula no es válida";
    if (this.fecha_Emision.toString() === 'Invalid Date') return "La fecha de emision no es válida";
    if (this.fecha_Emision > new Date()) return "No se pueden subir carnet vencidos";
    if (v.isNullorEmpty(this.imagenBase64)) return "La imagen no es valida";
    return true;
  }


}
