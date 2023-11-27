import { Component } from '@angular/core';
import {DataapiService} from "../../../services/dataapi/dataapi.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth/auth.service";
import {CookieService} from "ngx-cookie-service";
import getOffsetParent from "@popperjs/core/lib/dom-utils/getOffsetParent";
import {CarnetInfo} from "../../../models/responses/CarnetInfo";
import {Funcionarios} from "../../../models/Funcionarios";
import {UpdateFuncionario} from "../../../models/requests/UpdateFuncionario";
import {ValidateService} from "../../../services/validate/validate.service";

@Component({
  selector: 'app-actualizardatos',
  templateUrl: './actualizardatos.component.html',
  styleUrls: ['./actualizardatos.component.css']
})
export class ActualizardatosComponent {
    user:any = null;
    imagen = "assets/sinimagen.jpeg"
    TieneCarnet = false;
    carnet:CarnetInfo;

    pass = false;
    ico= "visibility_off";
    typeInput = "password";

    //valueBinding

    direccion:string= '';
    email:string= '';
    telefono:string= '';
    contrasena:string = '';

    constructor(
      private api:DataapiService,
      private nav:Router,
      private auth:AuthService,
      private cookie:CookieService,
      private val : ValidateService
    ) {
      this.user = auth.decodeToken(cookie.get('token'))
      //Estado del carnet
      this.estadoCarnet();
      this.obtenerImagen();

    }

  impactarCambios(){
      //validar
      if(
        this.val.isNullorEmpty(this.direccion) ||
        this.val.isNullorEmpty(this.telefono) ||
        this.val.isNullorEmpty(this.email) ||
        this.val.isNullorEmpty(this.contrasena)
      )  {
        alert("Rellene todos los campos");
      }else {
        let f  = new UpdateFuncionario(this.direccion,this.email,this.telefono,this.contrasena);
        this.api.actualizarDatosFuncionarioActual(f).subscribe(
          ok =>{
            alert(ok);
            this.nav.navigate(['hub/user'])
          },
          error =>{
            alert(error)
          }
        )
      }

  }

  errorNavigation(op : number)    {
     if (op === 1) {
       this.nav.navigate(['hub/agendarme']);
     } else{
       this.nav.navigate(['hub/carnetsalud']);
     }

  }

  //requests
  estadoCarnet(){
      this.api.obtenerDatosCarnet(this.user.ci).subscribe(
        (ok)=>{
            this.carnet = ok;
            this.TieneCarnet = true;
        },
        (error)=>{
            this.TieneCarnet = false;
        }
      )
  }
  obtenerImagen(onBoot:boolean = false){
      this.api.obtenerImagenBase64(this.user.ci).subscribe(
        ok=>{
            this.imagen = "data:image/png;base64," + ok;
        },
        error =>{
            this.imagen = "assets/sinimagen.jpeg"
        }
      )
  }


  toogleIcon(){
      this.pass = !this.pass;
      this.ico = this.pass? "visibility":"visibility_off";
      this.typeInput = this.pass? "text":"password";

  }

}
