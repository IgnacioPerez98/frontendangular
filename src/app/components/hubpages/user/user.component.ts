import { Component } from '@angular/core';
import {DataapiService} from "../../../services/dataapi/dataapi.service";
import {Funcionarios} from "../../../models/Funcionarios";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
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
    private data : DataapiService
  ) {
    this.obtenerFuncionario();
    this.obtenerImagen();

  }

  obtenerImagen(){
    this.data.obtenerImagenBase64(this.func.ci).subscribe(
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
