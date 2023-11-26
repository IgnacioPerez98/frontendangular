import {Component, Pipe} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {Funcionarios} from "../../models/Funcionarios";
import {DataapiService} from "../../services/dataapi/dataapi.service";
import {Error} from "../../models/responses/Error";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrando : boolean = false;
  hoy = new Date();
  func = new Funcionarios("","","",this.hoy,"","","","",false)

  constructor(
    private auth:AuthService,
    private nav:Router,
    private dataapi:DataapiService
  ) {
    this.hoy.setDate(Date.now())
  }

  onSubmit() {
    let res = this.func.datosOk();
    if(typeof res === "boolean"){
      this.dataapi.crearFuncionarios(this.func).subscribe(
        (ok)=>{
          let {text} = ok.error;
            console.log("Funcionario agregado con exito.")
            this.nav.navigate(['/login'])
        },
        (error:any)=>{
          let {mensaje} = error.error;
          if(typeof mensaje !== 'undefined'){
            alert(mensaje);
          }else {
            console.log(error);
          }
        }
      )
    }else {
      window.alert(res.toString())
    }
  }
  volver(){
    this.nav.navigate(['/login'])
  }
}
