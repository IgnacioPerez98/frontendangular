import {Component, OnInit} from '@angular/core';
import {DataapiService} from "../../../services/dataapi/dataapi.service";
import {Router} from "@angular/router";
import * as jwtdecode from "jwt-decode";
import {CookieService} from "ngx-cookie-service";
import {PeriodosDisponibles} from "../../../models/responses/PeriodosDisponibles";
import {PeriodoEspecial} from "../../../models/PeriodoEspecial";
import {Agenda} from "../../../models/responses/Agenda";
import {ReservaHora} from "../../../models/ReservaHora";
import {AuthService} from "../../../services/auth/auth.service";
import {FechaPipe, TipoFecha} from "../../../pipe/fecha/fecha.pipe";

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit{
  user:any;
  periodos: PeriodosDisponibles[] = [];
  periodo : PeriodoEspecial;
  selectedDate:string;
  turnos: Agenda[] = [];
  turno:Agenda;

  correcto = false;
  constructor(private apiService: DataapiService,
              private nav:Router,
              private cookie:CookieService,
              private auth:AuthService

  ) {}
  ngOnInit(): void {
    this.obtenerPeriodos();
    this.user = jwtdecode.jwtDecode(this.cookie.get('token'));
  }

  getCI(){
    const token = this.cookie.get('token');
    let claims: any =  this.auth.decodeToken(token)
    return claims.ci as string;
  }
  onSubmit(){
    let reserva = new ReservaHora(
      this.turno.numero,
      this.getCI(),
      new Date(this.turno.fecha_Agenda),
      true);

      this.apiService.reservarHora(reserva,this.periodo.fch_Inicio, this.periodo.fch_Fin).subscribe(
        ok=>{
          alert(ok);
        },
        error => {
          alert(error)
        }
      )
  }
  obtenerPeriodos(){
    this.apiService.getPeriodosDisponibles().subscribe(
      (periodos)=>{

        periodos.forEach( p =>{
          let period = new PeriodosDisponibles(
            p.anio,
            p.semestre,
            new Date(p.fch_Inicio),
            new Date(p.fch_Fin),
            p.isOpen
          )
          this.periodos.push( period);
        })
      },
      (error)=>{
        this.nav.navigate(['/error'])
        console.error(error)
      }
    )
  }
  getFechita(fecha:Date){
    let pipe = new FechaPipe();
    return pipe.transform(new Date(fecha),TipoFecha.SoloFecha);
  }
  getHora(fecha:Date){
    const f1 = new Date(fecha);
    return `${f1.getHours()}:${f1.getMinutes().toString().padStart(2,"0")}`
  }

  sonIguales(fecha1: Date, fecha2: Date): boolean {
    const f1 = new Date(fecha1);
    return (
      f1.getFullYear() === fecha2.getFullYear() &&
      f1.getMonth() === fecha2.getMonth() &&
      f1.getDate() === fecha2.getDate()
    );
  }
  isDisabledDate(date: string): boolean {
    const currentDate = new Date(date);
    const minDateTime = new Date(this.periodo.fch_Inicio);
    const maxDateTime = new Date(this.periodo.fch_Fin);
    return currentDate < minDateTime || currentDate > maxDateTime;
  }
  //stepper
  currentStep: number = 1;

  isDisabledNext(){
    switch (this.currentStep){
      case 1:
        if(this.periodo === null) return false;
        break;
      case 3:
        if (this.turno === null || this.turno === undefined) return true;
        break;
      case 4:
        return true;
    }
    return false;
  }
  isDisabledPrev(){
    switch (this.currentStep){
      case 1:
        return false;
        break;
    }
    return false;
  }
  nextStep() {
    switch (this.currentStep){
      case 1:
        let p = new PeriodoEspecial(this.periodo.anio,this.periodo.semestre,this.periodo.fch_Inicio, this.periodo.fch_Fin);
        //cargo las fechas
        this.apiService.getFechasDisponibles(p.fch_Inicio,p.fch_Fin).subscribe(
          (ok)=> {
            ok.forEach( ag=>{
              this.turnos.push(ag)
            })//ok
          },
          (error)=>{
            return;
          }
        )
        break;
      case 2:
        this.turnos = this.turnos.filter(t => this.sonIguales(t.fecha_Agenda,new Date(this.selectedDate)))
    }
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
