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
import {Error} from "../../../models/responses/Error";

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
  turnosback: Agenda[] = [];
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
        (error:any)=> {
          const e:any = JSON.parse(error.error);
          alert(e.mensaje);
        }
      )
      this.currentStep = 1;
  }
  obtenerPeriodos(){
    this.apiService.getPeriodosDisponibles().subscribe(
      (periodos)=>{

        periodos.forEach( p =>{
          let init:string = p.fch_Inicio.toString();
          let  fin :string = p.fch_Fin.toString();
          let period = new PeriodosDisponibles(
            p.anio,
            p.semestre,
            this.dateBuild(init),
            this.dateBuild(fin),
            p.isOpen
          )
          this.periodos.push( period);
        })
      },
      (error)=>{
        console.error(error)
      }
    )
  }
  newDateToString(){
    let newDate = new Date();
    let mes = newDate.getMonth()+1;
    return `${newDate.getFullYear()}-${mes.toString().padStart(2,"0")}-${newDate.getDate().toString().padStart(2,"0")}`;
  }

  dBuild(fecha:Date){
    let f :string = fecha.toString();
    return this.dateBuild(f.split('T')[0])
  }
  dateBuild(fecha:string){
    let m = fecha.split("-");
    let year = parseInt(m[0]);
    let month = parseInt(m[1])-1;
    let day = parseInt(m[2]);
    return new Date(year,month,day);
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
              this.turnosback.push(ag)
              this.turnos.push(ag)
            })//ok
          },
          (error)=>{
            return;
          }
        )
        break;
      case 2:
        this.turnos = this.turnosback.filter(t => this.sonIguales(t.fecha_Agenda,this.dateBuild(this.selectedDate)))
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
