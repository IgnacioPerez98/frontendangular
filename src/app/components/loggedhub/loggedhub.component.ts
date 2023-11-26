import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as jwtdecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { CarnetSalud } from 'src/app/models/CarnetSalud';
import { ReservaHora } from 'src/app/models/ReservaHora';
import { PeriodosDisponibles } from 'src/app/models/responses/PeriodosDisponibles';
import { DataapiService } from 'src/app/services/dataapi/dataapi.service';

@Component({
  selector: 'app-loggedhub',
  templateUrl: './loggedhub.component.html',
  styleUrls: ['./loggedhub.component.css']
})
export class LoggedhubComponent implements OnInit {

  user:any;
  isFuncionario:boolean = false;

  constructor(
    private cookie:CookieService,
    private apiService:DataapiService
  ) { }

  ngOnInit() {
    this.user = jwtdecode.jwtDecode(this.cookie.get('token'));
    console.log("user",this.user);
    this.isFuncionario= this.getIsFuncionario();
    //this.obtenerPeriodos();
  }
  getIsFuncionario(){
    return this.user.rol === "funcionario";
  }

/*  NO LO BORRE POR LAS DUDAS
  reservaForm:boolean = false;
  carnetForm:boolean = false;
  periodos: any[] = [];
  //date:Date;
  //image:ImageBitmap;

  reserva:any;
  carnet:CarnetSalud;

  reservaFormGroup= new FormGroup({
    numero: new FormControl(0,{nonNullable:true}),
    ci: new FormControl('',{nonNullable:true}),
    fechaAgenda: new FormControl('',{nonNullable:true}),
    reservado: new FormControl(false,{nonNullable:true}),
    periodo: new FormControl('',{nonNullable:true})
  });

  carnetFormGroup= new FormGroup({
    ci: new FormControl('',{nonNullable:true}),
    fechaEmision: new FormControl('',{nonNullable:true}),
    fechaVencimiento: new FormControl('',{nonNullable:true}),
    imagen: new FormControl(ImageBitmap,{nonNullable:true})
  });


  toggleForm(value: string) {
    switch (value) {
      case 'Agendarme':
        this.carnetForm = false;
        this.reservaForm = !this.reservaForm;
        break;
      case 'Carnet':
        this.reservaForm = false;
        this.carnetForm = !this.carnetForm;
        break;
    }
  }
  onSubmit(value: string) {
    switch (value) {
      case 'reserva':
        console.log(this.reservaFormGroup.value);
        this.checkReservaForm(this.reservaFormGroup.value.ci, this.reservaFormGroup.value.fechaAgenda, this.reservaFormGroup.value.periodo);
        break;
      case 'carnet':
        //this.checkCarnetForm(this.carnetFormGroup.value.ci, this.carnetFormGroup.value.fechaEmision, this.carnetFormGroup.value.fechaVencimiento, this.carnetFormGroup.value.imagen);
        break;
    }

  }
  obtenerPeriodos(){
    this.apiService.getPeriodosDisponibles().subscribe(
      (periodos)=>{

        this.periodos = periodos;
        console.log("periodos",this.periodos);
      },
      (error)=>{console.error(error)}
    )
  }

  checkReservaForm(ci:string|undefined, fecha:string|undefined, periodo:string|undefined){
    if(ci!==undefined && fecha!==undefined && periodo!==undefined ){
      const date = new Date(fecha);
      const fechaInicioPeriodo = new Date(periodo.split('/')[0]);
      const fechaFinPeriodo = new Date(periodo.split('/')[1]);
      this.reserva = new ReservaHora(1, ci, date, true);

       this.apiService.reservarHora(this.reserva, fechaInicioPeriodo, fechaFinPeriodo).subscribe(
        (ok)=>{console.log(ok)},
        (error)=>{console.error(error)}
       )
      alert("Reserva realizada con éxito!");
    }
    else{
      alert("Debe completar todos los campos");
    }
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
*/

}
