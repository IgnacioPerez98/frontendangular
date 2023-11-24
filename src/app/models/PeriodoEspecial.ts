export class PeriodoEspecial{
  anio:number;
  semestre:number;
  fch_Inicio:Date;
  fch_Fin:Date;

  constructor(anio: number, semestre: number, fch_Inicio: Date, fch_Fin: Date) {
    this.anio = anio;
    this.semestre = semestre;
    this.fch_Inicio = fch_Inicio;
    this.fch_Fin = fch_Fin;
  }
}
