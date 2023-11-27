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

  fechainicio:Date;
  fechafin:Date;

  max = '2050-01-01'
  min = new Date().toISOString().split('T')[0];

  constructor(
    private apiService:DataapiService,
  ) {
    this.clear();

  }

  clear(){
    this.fechainicio = new Date();
    this.fechafin = new Date();
  }

  enviar(){
      if(this.validarFechas()){
        let i = new Date(this.fechainicio.toISOString().split('T')[0]);
        let f = new Date(this.fechafin.toISOString().split('T')[0]);
        const periodo = new PeriodoEspecial(
          f.getFullYear(),
          f.getMonth()>5?2:1,
          i,
          f
        );
        /*
        this.apiService.abrirPeriodoEspecial(periodo)?.subscribe(
          ok => {
            alert(ok);
            this.clear();
          },
          error => {
            console.log(error);
            alert('No se pudo abrir el periodo')
          }

        )*/
        let pipe = new FechaPipe();
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
    const minDateTime = new Date();
    const maxDateTime = new Date(2050,12,31);
    return currentDate < minDateTime || currentDate > maxDateTime;
  }


  protected readonly isStandalone = isStandalone;
}
