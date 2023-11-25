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
}
