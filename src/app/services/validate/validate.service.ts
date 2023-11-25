import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

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

  public getFormattedDate(fechaParam:Date){
    let fecha = new DatePipe('en-US')
    let fc = fecha.transform(fechaParam,'yyyy-MM-ddTHH:mm:ss.SSSZ')
    if(typeof fc === 'string'){ return fc};
    return "";
  } 
}
