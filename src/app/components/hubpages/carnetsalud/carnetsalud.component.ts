import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {DataapiService} from "../../../services/dataapi/dataapi.service";
import {CarnetSalud} from "../../../models/CarnetSalud";

@Component({
  selector: 'app-carnetsalud',
  templateUrl: './carnetsalud.component.html',
  styleUrls: ['./carnetsalud.component.css']
})
export class CarnetsaludComponent {
  carnetForm:boolean = true;
  carnet:CarnetSalud;


  carnetFormGroup= new FormGroup({
    ci: new FormControl('',{nonNullable:true}),
    fechaEmision: new FormControl('',{nonNullable:true}),
    fechaVencimiento: new FormControl('',{nonNullable:true}),
    imagen: new FormControl('',{nonNullable:true})
  });
  constructor(
    private cookie:CookieService,
    private apiService:DataapiService
  ) {}

  onSubmit(){
    //this.checkCarnetForm(this.carnetFormGroup.value.ci, this.carnetFormGroup.value.fechaEmision, this.carnetFormGroup.value.fechaVencimiento, this.carnetFormGroup.value.imagen);

  }
  checkCarnetForm(ci:string|undefined, fechaEmision:string|undefined, fechaVencimiento:string|undefined, image:string|undefined){
    if(ci!==undefined && fechaEmision!==undefined && fechaVencimiento!==undefined && image!==undefined){
      const fechaEmis= new Date(fechaEmision);
      const fechaVenc = new Date(fechaVencimiento);

      this.carnet = new CarnetSalud(ci, fechaEmis, fechaVenc, image);

      alert("Carnet generado con éxito!");
    }
    else{
      alert("Debe completar todos los campos");
    }
  }




}
