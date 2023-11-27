import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PeriodoEspecial } from 'src/app/models/PeriodoEspecial';
import { DataapiService } from 'src/app/services/dataapi/dataapi.service';

@Component({
  selector: 'app-abrirperiodo',
  templateUrl: './abrirperiodo.component.html',
  styleUrls: ['./abrirperiodo.component.css']
})
export class AbrirperiodoComponent implements OnInit{

  abrirPeriodoGroup = new FormGroup({
    fechaInicio: new FormControl('',{nonNullable:true}),
    fechaFin: new FormControl('',{nonNullable:true}),
    anio: new FormControl('',{nonNullable:true}),
    semestre: new FormControl('',{nonNullable:true})
  })

  constructor(
    private apiService:DataapiService
  ) { }

  ngOnInit(): void {
  }

  enviar(){
    const formChecked= this.checkForm(this.abrirPeriodoGroup.value.fechaInicio, this.abrirPeriodoGroup.value.fechaFin, this.abrirPeriodoGroup.value.anio, this.abrirPeriodoGroup.value.semestre);
    
  }

  checkForm(fechaInicio:string|undefined, fechaFin:string|undefined, anio:string|undefined, semestre:string|undefined){

    if(fechaInicio!==undefined && fechaFin!==undefined && anio!==undefined && semestre!==undefined){
      const fecha_inicio = new Date(fechaInicio);
      const fecha_fin = new Date(fechaFin);
      const anioInt = parseInt(anio);
      const semestreInt = parseInt(semestre);
      if(fecha_inicio<fecha_fin){
        if(anioInt>0){
          if(semestreInt>0 && semestreInt<3){
            const nuevoPeriodo = new PeriodoEspecial(anioInt, semestreInt, fecha_inicio, fecha_fin);
            this.apiService.abrirPeriodoEspecial(nuevoPeriodo).subscribe(
              (res:any)=>{
                if(res===false){
                  alert("Tienes que ser admn")
                }
                else{
                  alert(res.Message);
                }
              },
              (error:any)=>{
                alert(error.Message);
              }
            );
          }else{
            alert("Semestre inválido");
          }
        }else{
          alert("Año inválido");
        }
      }else{
        alert("La fecha de inicio debe ser menor a la fecha de fin");
      }
    }else{
      alert("Debe completar todos los campos");
    }
  }


}
