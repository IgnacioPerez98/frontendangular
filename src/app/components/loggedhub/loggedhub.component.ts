import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as jwtdecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { CarnetSalud } from 'src/app/models/CarnetSalud';
import { ReservaHora } from 'src/app/models/ReservaHora';

@Component({
  selector: 'app-loggedhub',
  templateUrl: './loggedhub.component.html',
  styleUrls: ['./loggedhub.component.css']
})
export class LoggedhubComponent implements OnInit {

  user:any; 
  isFuncionario:boolean = false;
  reservaForm:boolean = false;
  carnetForm:boolean = false;
  //date:Date;
  //image:ImageBitmap;

  reserva:ReservaHora;
  carnet:CarnetSalud;

  reservaFormGroup= new FormGroup({
    numero: new FormControl(0,{nonNullable:true}),
    ci: new FormControl('',{nonNullable:true}),
    fechaAgenda: new FormControl('',{nonNullable:true}),
    reservado: new FormControl(false,{nonNullable:true})
  });

  carnetFormGroup= new FormGroup({
    ci: new FormControl('',{nonNullable:true}),
    fechaEmision: new FormControl('',{nonNullable:true}),
    fechaVencimiento: new FormControl('',{nonNullable:true}),
    imagen: new FormControl(ImageBitmap,{nonNullable:true})
  });

  constructor(
    private cookie:CookieService
  ) { }

  ngOnInit() {
    this.user = jwtdecode.jwtDecode(this.cookie.get('token'));
    console.log("user",this.user);
    this.isFuncionario= this.getIsFuncionario();
  }

  getIsFuncionario(){
    return this.user.rol === "funcionario";
  }

  toggleForm(value: string) {
    switch (value) {
      case 'Agendarme':
        this.reservaForm = !this.reservaForm;
        break;
      case 'Carnet':
        this.carnetForm = !this.carnetForm;
        break;
    }
  }
  onSubmit(value: string) {
    switch (value) {
      case 'reserva':
        this.checkReservaForm(this.reservaFormGroup.value.ci, this.reservaFormGroup.value.fechaAgenda);
        break;
      case 'carnet':
        //this.checkCarnetForm(this.carnetFormGroup.value.ci, this.carnetFormGroup.value.fechaEmision, this.carnetFormGroup.value.fechaVencimiento, this.carnetFormGroup.value.imagen);
        break;
    }
    
  }

  checkReservaForm(ci:string|undefined, fecha:string|undefined){
    if(ci!==undefined && fecha!==undefined){
      const date = new Date(fecha);
      this.reserva = new ReservaHora(1, ci, date, true);
      alert("Reserva realizada con éxito!");
    }  
  }

  checkCarnetForm(ci:string|undefined, fechaEmision:string|undefined, fechaVencimiento:string|undefined, image:ImageBitmap|undefined){
    if(ci!==undefined && fechaEmision!==undefined && fechaVencimiento!==undefined && image!==undefined){
      const fechaEmis= new Date(fechaEmision);
      const fechaVenc = new Date(fechaVencimiento);

      this.carnet = new CarnetSalud(ci, fechaEmis, fechaVenc, image);
      alert("Carnet generado con éxito!");
    }
  }


}
