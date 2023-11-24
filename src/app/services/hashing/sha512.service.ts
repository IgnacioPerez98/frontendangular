import { Injectable } from '@angular/core';
import * as CrypoJS from 'crypto-js'

@Injectable({
  providedIn: 'root'
})
export class SHA512Service {
  key:string = '[*t)kM%f0mF)xx(b!~]5G%S^W|ua@^=0$+LUb96FY%PH=pK%,k';
  constructor() { }
  public EncryptSHA512(entrada:string):string{
    let hash = CryptoJS.HmacSHA512(entrada, this.key);
    return  hash.toString(CryptoJS.enc.Hex)
  }
  public AssertSHA512(clave :string, hashRecived :string):boolean{
    console.log("Hash Recived: ",hashRecived);
    let hash = CryptoJS.HmacSHA512(clave, this.key);
    let valor =  hash.toString(CryptoJS.enc.Hex);
    console.log("Hash Calculated: ",valor);
    return hashRecived == valor;
  }
}
