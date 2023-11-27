import { Component } from '@angular/core';
import {DataapiService} from "../../../services/dataapi/dataapi.service";
import {Funcionarios} from "../../../models/Funcionarios";
import {AuthService} from "../../../services/auth/auth.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  user:any;
  image:string = "assets/sinimagen.jpeg"
  func = new Funcionarios(
    "",
    "",
    "",
    new Date(),
  "",
    "",
    "",
    "",
    false
  );

  constructor(
    private auth:AuthService,
    private cookie:CookieService,
    private data : DataapiService
  ) {
    this.user = auth.decodeToken(cookie.get('token'));
    this.obtenerFuncionario();
    this.obtenerImagen();

  }

  obtenerImagen(){
    this.data.obtenerImagenBase64(this.user.ci).subscribe(
      ok=>{
          this.image = "data:image/png;base64," + ok;
      },
      error =>{
          this.image = "assets/sinimagen.jpeg"
      }
    )
  }
  obtenerFuncionario(){
      this.data.obtenerFuncionarioActual().subscribe(
        ok => {
          this.func = ok;
          this.func.pasword = "";
        },
        error =>{
          console.log(error)
        }
      )
  }

}
