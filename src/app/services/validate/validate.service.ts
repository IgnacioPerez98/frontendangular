import {Injectable} from '@angular/core';
import {FechaPipe, TipoFecha} from "../../pipe/fecha/fecha.pipe";

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }
  public isNullorEmpty(p:string):boolean
  {
    if(p.trim()==='') return true;
    if(p === null) return true;
    return false;
  }

  public soloNumeros(param:string){
    return  /^[0-9]+$/.test(param)
  }


  public getFormattedDate(fechaParam:Date){
    let pipe = new FechaPipe();
    return pipe.transform(fechaParam, TipoFecha.FechaYHora);
  }
}
