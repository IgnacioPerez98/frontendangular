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
}
