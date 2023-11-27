import {FechaPipe, TipoFecha} from "../../pipe/fecha/fecha.pipe";

export class PeriodosDisponibles{
  anio:number;
  semestre: number;
  fch_Inicio: Date;
  fch_Fin: Date;
  isOpen:boolean;


  constructor(anio: number, semestre: number, fch_Inicio: Date, fch_Fin: Date, isOpen: boolean) {
    this.anio = anio;
    this.semestre = semestre;
    this.fch_Inicio = fch_Inicio;
    this.fch_Fin = fch_Fin;
    this.isOpen = isOpen;
  }
  getFechaLinda(opt:number){
    const pipe = new FechaPipe();
    return opt === 1? pipe.transform(this.fch_Inicio, TipoFecha.SoloFecha):pipe.transform(this.fch_Fin, TipoFecha.SoloFecha)
  }

  estaAbierto(){
    let f = new Date(this.fch_Fin)
    let now = new Date();
    return now <= f;
  }
}
