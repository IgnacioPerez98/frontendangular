import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {DataapiService} from "../../../services/dataapi/dataapi.service";
import {Router, RouterEvent} from "@angular/router";
import {ReservaHora} from "../../../models/ReservaHora";
import * as jwtdecode from "jwt-decode";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit{
  user:any;
  periodos: any[] = [];
  reserva:any;
  reservaForm:boolean = true;



  reservaFormGroup= new FormGroup({
    numero: new FormControl(0,{nonNullable:true}),
    ci: new FormControl('',{nonNullable:true}),
    fechaAgenda: new FormControl('',{nonNullable:true}),
    reservado: new FormControl(false,{nonNullable:true}),
    periodo: new FormControl('',{nonNullable:true})
  });

  constructor(private apiService: DataapiService,
              private nav:Router,
              private cookie:CookieService

  ) {}
  ngOnInit(): void {
    this.obtenerPeriodos();
    this.user = jwtdecode.jwtDecode(this.cookie.get('token'));
  }

  onSubmit(){
    console.log(this.reservaFormGroup.value);
    this.checkReservaForm(this.reservaFormGroup.value.ci, this.reservaFormGroup.value.fechaAgenda, this.reservaFormGroup.value.periodo);
  }
  obtenerPeriodos(){
    this.apiService.getPeriodosDisponibles().subscribe(
      (periodos)=>{

        this.periodos = periodos;
        console.log("periodos",this.periodos);
      },
      (error)=>{
        this.nav.navigate(['/error'])
        console.error(error)
      }
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

  //stepper
  currentStep: number = 1;
  nextStep() {
    if (this.currentStep < 5) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

}
