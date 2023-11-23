import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenModel} from "../../models/responses/TokenModel";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_ENDPOINT:string = "endpoint";
  constructor(private http: HttpClient) { }
  /*
  * el email default => nachopp98@gmail.com
  * la clave default => clave1
  * */
  public obtenerToken(email:string, password:string){
    let ending = "auth/gettoken";
    let header = {
      'accept': '*/*',
      'Content-Type': 'application/json'
    }
    const body = {
      "email": `${email}`,
      "password": `${password}`
    };
    return this.http.post<TokenModel>(this.API_ENDPOINT+ending,body,{headers:header})
  }
}
