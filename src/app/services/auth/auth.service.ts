import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenModel} from "../../models/responses/TokenModel";
import * as jwtdecode from 'jwt-decode';
import {Error} from "../../models/responses/Error";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_ENDPOINT:string = "http://localhost:8080/api/";
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
  public decodeToken(token: string): string {
    return jwtdecode.jwtDecode(token);
  }
}
