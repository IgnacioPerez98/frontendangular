import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(value: Date, tipe:TipoFecha): string {
    try {
      if(value === null) return "";
      let fecha = new Date(value);

      let d = fecha.getDate().toString().padStart(2,"0")
      let m = (fecha.getMonth()+1).toString().padStart(2,"0")
      let a = fecha.getFullYear();


      if(tipe === TipoFecha.SoloFecha){
        return `${a}-${m}-${d}`;
      }else if (tipe === TipoFecha.FechaYHora){
        let h = fecha.getHours().toString().padStart(2,"0");
        let min = fecha.getMinutes().toString().padStart(2,"0");
        let s = fecha.getSeconds().toString().padStart(2,"0");
        return `${a}-${m}-${d}T${h}:${min}:${s}.000Z`;
      }
    }catch (error){
      console.error("Error en PipeFecha: \n" ,error)
      return "";
    }
    return "";
  }

}
export enum TipoFecha{
  FechaYHora,
  SoloFecha
}
