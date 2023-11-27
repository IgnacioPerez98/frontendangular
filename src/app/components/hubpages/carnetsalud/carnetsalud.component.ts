import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {DataapiService} from "../../../services/dataapi/dataapi.service";
import {CarnetSalud} from "../../../models/CarnetSalud";
import {ValidateService} from "../../../services/validate/validate.service";

@Component({
  selector: 'app-carnetsalud',
  templateUrl: './carnetsalud.component.html',
  styleUrls: ['./carnetsalud.component.css']
})
export class CarnetsaludComponent {
  carnetForm:boolean = true;
  carnet:CarnetSalud;

  ci:string = '';
  fecha_Emision:string = '';
  fecha_Vencimiento:string = '';
  imagen:string = '';

  constructor(
    private cookie:CookieService,
    private apiService:DataapiService,
    private val : ValidateService
  ) {
    this.fecha_Emision = this.newDateToString();
    this.fecha_Vencimiento = this.newDateToString();
  }


  selectedFile: File;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      this.convertToBase64();
    }
  }

  convertToBase64(): void {
    const reader = new FileReader();

    reader.onload = (e: any) => {
     this.imagen = e.target.result.split(',')[1];
      console.log('Base64 Image:', this.imagen);
    };

    reader.readAsDataURL(this.selectedFile);
  }
  Enviar() {
      if(this.validar()){
        const c = new CarnetSalud(
          this.ci,
          this.dateBuild(this.fecha_Emision),
          this.dateBuild(this.fecha_Vencimiento),
          this.imagen)
        this.apiService.enviarCarnet(c).subscribe(
          ok =>{
              alert(ok);
          },
          (error:any)=>{
            console.log(error.message)
            alert("La solicitud fallo")
          }
        )

      }else {
        alert('Los datos proporcionados no son correctos.')
      }

  }

  newDateToString(){
    let newDate = new Date();
    let mes = newDate.getMonth()+1;
    return `${newDate.getFullYear()}-${mes.toString().padStart(2,"0")}-${newDate.getDate().toString().padStart(2,"0")}`;
  }

  validar(){
    return !(
      this.val.isNullorEmpty(this.ci) ||
      this.val.isNullorEmpty(this.imagen) ||
        this.fecha_Emision >= this.fecha_Vencimiento
    )
  }

  dateBuild(fecha:string){
    let m = fecha.split("-");
    let year = parseInt(m[0]);
    let month = parseInt(m[1])-1;
    let day = parseInt(m[2]);
    return new Date(year,month,day);
  }
}
