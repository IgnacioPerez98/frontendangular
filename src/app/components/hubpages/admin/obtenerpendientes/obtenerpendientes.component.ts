import { Component } from '@angular/core';
import {BasicFuncionario} from "../../../../models/responses/BasicFuncionario";
import {DataapiService} from "../../../../services/dataapi/dataapi.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {of} from "rxjs";

@Component({
  selector: 'app-obtenerpendientes',
  templateUrl: './obtenerpendientes.component.html',
  styleUrls: ['./obtenerpendientes.component.css']
})
export class ObtenerpendientesComponent {
    pend:BasicFuncionario[] = [];

  constructor(private api : DataapiService) {
    api.obtenerListaFuncionariosDesactualizados()?.subscribe(
      ok => {
        ok.forEach( bf =>{
          this.pend.push(bf);
        })
      },
      error =>{
        console.log(error);
      }
    )

  }


}
