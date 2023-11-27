import {Component, isStandalone} from '@angular/core';
import {PeriodoEspecial} from 'src/app/models/PeriodoEspecial';
import {DataapiService} from 'src/app/services/dataapi/dataapi.service';
import {FechaPipe, TipoFecha} from "../../../../pipe/fecha/fecha.pipe";

@Component({
  selector: 'app-abrirperiodo',
  templateUrl: './abrirperiodo.component.html',
  styleUrls: ['./abrirperiodo.component.css']
})
export class AbrirperiodoComponent{

  fechainicio:string;
  fechafin:string;

  max = '2050-01-01'
  min = this.newDateToString();

  constructor(
    private apiService:DataapiService,
  ) {

  }

  newDateToString(){
    let newDate = new Date();
    let mes = newDate.getMonth()+1;
    return `${newDate.getFullYear()}-${mes.toString().padStart(2,"0")}-${newDate.getDate().toString().padStart(2,"0")}`;
  }
  dateBuild(fecha:string){
    let m = fecha.split("-");
    let year = parseInt(m[0]);
    let month = parseInt(m[1]);
    let day = parseInt(m[2]);
    return new Date(year,month,day);
  }

  enviar(){
      if(this.validarFechas()){
        let i = this.dateBuild(this.fechainicio);
        let f = this.dateBuild(this.fechafin)
        const periodo = new PeriodoEspecial(
          f.getFullYear(),
          f.getMonth()>5?2:1,
          i,
          f
        );
        this.apiService.abrirPeriodoEspecial(periodo)?.subscribe(
          (ok:any)   => {
            alert(ok.message);
            this.fechainicio = this.newDateToString();
            this.fechafin = this.newDateToString();
          },
          error => {
            console.log(error);
            alert('No se pudo abrir el periodo')
          }

        )
        let pipe = new FechaPipe();
        console.log(new Date())
        console.log("Inicio", i);
        console.log("Fin", f);
        console.log("Pipe Inicio", pipe.transform(i, TipoFecha.FechaYHora));
        console.log("Pipe Fin",  pipe.transform(f, TipoFecha.FechaYHora));

      }else {
        alert('Verifique la fecha seleccionada')
      }
  }

  validarFechas(){
      let f1 = new Date(this.fechainicio);
      let f2 = new Date(this.fechafin);
      return f1 <= f2;
  }

  isDisabledDate(date: string): boolean {
    const currentDate = new Date(date);
    const minDateTime = new Date(this.min);
    const maxDateTime = new Date(2050,12,31);
    return currentDate < minDateTime || currentDate > maxDateTime;
  }


  protected readonly isStandalone = isStandalone;
}
